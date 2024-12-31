import UserModel from '../models/user.model.js';
import MessageModel from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';
import { io, getReceiverSucketId } from '../lib/socket.js';

export async function getAllUsersData(req, res) {
  try {
    const currentLoggedUserId = req.user._id; //the user object which was created on protectedRoute

    // have to listen when i have a new message, and when i have to trigger a refresh of all users, in this way the user will see where he has new messages

    if (!currentLoggedUserId) {
      req.session.user = null;

      return res.status(400).json({ message: 'Please login to get all users' });
    }

    const allUsers = await UserModel.find({
      _id: { $ne: currentLoggedUserId },
    }).select('-password'); //grab all ids except mine , also exclude any password: $ne (is not equeal to) / exclude password

    const currentLoggedUser = await UserModel.findOne({
      _id: currentLoggedUserId,
    });

    const theUnreadMessagesOfcurrentLoggedUser = await MessageModel.find(
      { receiverId: currentLoggedUserId, receiverRead: false } //if the user is and hasn't read the message
    );

    const sendersIds = theUnreadMessagesOfcurrentLoggedUser.map(
      (message) => message.senderId
    );

    // IDS OF ALL UNREAD MESSAGES SENDERS
    const idsOfSendersWhoLeftUnreadMessages = Array.from(sendersIds, (id) =>
      id.toString()
    );

    await Promise.all(
      allUsers.map(async (user) => {
        // The user will keep an array of users Who sent messages and weren't read yet
        if (
          idsOfSendersWhoLeftUnreadMessages.length > 0 &&
          idsOfSendersWhoLeftUnreadMessages.includes(user._id.toString()) &&
          !user.idsOfReceiversWhoUnreadMessages.includes(
            currentLoggedUserId.toString()
          )
        ) {
          //if the user is found in those array ids then we will add the receiver who hasn't read mess to its array
          await UserModel.updateOne(
            { _id: user._id }, //update the receiverId with new message notification
            {
              $set: {
                sentNewMessageNotification: false,
                idsOfReceiversWhoUnreadMessages: [
                  ...user.idsOfReceiversWhoUnreadMessages, //if the receiver (me) have sender in my array of unread messages then add my id to his array as unread receiver
                  currentLoggedUserId.toString(), //means i have unread message
                ],
              },
            },
            { new: true }
          );
          await UserModel.updateOne(
            { _id: currentLoggedUserId }, //update the receiverId with new message notification
            {
              $set: {
                sentNewMessageNotification: false,
                idsOfSendersWhoLeftUnreadMessages: [
                  ...currentLoggedUser.idsOfSendersWhoLeftUnreadMessages,
                  user._id.toString(),
                ],
              },
            },
            { new: true }
          );
        }
        return user;
      })
    );

    if (allUsers) {
      return res.status(200).json(allUsers);
    } else {
      return res.status(400).json({ message: 'Error getting users' });
    }
  } catch (error) {
    console.log('🚀 \n\n ~ getAllUsersData ~ error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getMessages(req, res) {
  try {
    const { id: userIdToChatWith } = req.params; //the user with witch we want to chat

    const myId = req.user._id; //current logged in user

    const messages = await MessageModel.find({
      $or: [
        // filter messages based on my id or the user id
        { senderId: myId, receiverId: userIdToChatWith }, //if i am the sender
        { senderId: userIdToChatWith, receiverId: myId }, //if the user is sender
      ],
    });

    const filtredReadMessages = await Promise.all(
      messages.map(async (message) => {
        // Check conditions
        if (
          !message.receiverRead &&
          message.receiverId.toString() === myId.toString() //only when i am receiver id and not read
        ) {
          message.receiverRead = true;

          // Update messages in the database
          await MessageModel.updateOne(
            { _id: message._id }, // Use the correct filter
            { $set: { receiverRead: true } }
          );

          // Update user notification in the database
          await UserModel.updateOne(
            { _id: message.senderId }, // Ensure this is the correct field
            { $set: { sentNewMessageNotification: false } }
          );
        }

        return message;
      })
    );

    if (filtredReadMessages) {
      return res.status(200).json(filtredReadMessages);
    }
  } catch (error) {
    console.log('🚀 \n\n ~ getMessages ~ error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function sendMessage(req, res) {
  try {
    const { id: userIdToChatWith } = req.params; //the user with witch we want to chat
    const myId = req.user._id; //current logged in user

    const { message, image } = req.body;

    let imageUrl;

    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadedImage.secure_url;
    }

    const userToChatWith = await UserModel.findOne({ _id: userIdToChatWith });

    if (userToChatWith) {
      const newMessage = new MessageModel({
        senderId: myId,
        receiverId: userIdToChatWith,
        message: message ? message : '',
        image: imageUrl ? imageUrl : '',
        senderRead: true,
        //is read by receiver if he has the conversation already opened
        receiverRead:
          userToChatWith.selectedUserToChatWithId.toString() === myId.toString()
            ? true
            : false,
        isSelectedUserToChatWith:
          userToChatWith.selectedUserToChatWithId.toString() ===
          myId.toString(), // if user i send message to , has selected miself as user to chat with
      });

      if (newMessage) {
        await newMessage.save();

        await UserModel.updateOne(
          //On new message set notification as true/ when user opens message it will be set to false
          { _id: myId },
          { $set: { sentNewMessageNotification: true } }
        );

        // CONNECT TO SOCKET MESSAGES
        const receiverSocketId = getReceiverSucketId(userIdToChatWith);

        //only sending message to a receiver io.to(receiver)
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('newMessage', newMessage);

          //listen for new messages notification, if receiver don't have current sender selected in chat that means that the message sent is notification unread message
          io.to(receiverSocketId).emit(
            'newUnreadNotificationMessage',
            newMessage
          );
        }

        return res.status(201).json(newMessage);
      } else {
        return res.status(400).json({ message: 'Error creating message' });
      }
    }
  } catch (error) {
    console.log('🚀 \n\n ~ sendMessage ~ error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function selectUserForChat(req, res) {
  try {
    const { id: userIdToChatWith } = req.body; //the user with witch we want to chat

    const myId = req.user._id; //current logged in user
    const selectedUser = await UserModel.findOne({
      //idsOfSendersWhoLeftUnreadMessages idsOfReceiver to exlude the myId
      _id: userIdToChatWith,
    });

    const currentLoggedUser = await UserModel.findOne({
      //idsOfSendersWhoLeftUnreadMessages idsOfReceiver to exlude userIdsToChatWith
      _id: myId,
    });

    // SENDER
    const senderFilterIdsOfSendersWhoLeftUnreadMessages =
      selectedUser.idsOfSendersWhoLeftUnreadMessages.filter(
        (id) => id !== myId
      )[0];
    const senderFilterIdsOfReceiversWhoUnreadMessages =
      selectedUser.idsOfReceiversWhoUnreadMessages.filter(
        (id) => id !== myId
      )[0];

    // RECEIVER
    const receiverFilterIdsOfSendersWhoLeftUnreadMessages =
      currentLoggedUser.idsOfSendersWhoLeftUnreadMessages.filter(
        (id) => id !== userIdToChatWith
      )[0];
    const receiverFilterIdsOfReceiversWhoUnreadMessages =
      currentLoggedUser.idsOfReceiversWhoUnreadMessages.filter(
        (id) => id !== userIdToChatWith
      )[0];

    if (selectedUser) {
      // this endpoint can make read sent messages from sender by passing his id
      Promise.all([
        await UserModel.updateOne(
          { _id: myId },
          {
            $set: {
              selectedUserToChatWithId: selectedUser._id,
              idsOfReceiversWhoUnreadMessages:
                receiverFilterIdsOfReceiversWhoUnreadMessages,
              idsOfSendersWhoLeftUnreadMessages:
                receiverFilterIdsOfSendersWhoLeftUnreadMessages,
            },
          },
          {
            new: true,
          }
        ),
        await UserModel.updateOne(
          { _id: userIdToChatWith },
          {
            $set: {
              sentNewMessageNotification: false,
              idsOfReceiversWhoUnreadMessages:
                senderFilterIdsOfReceiversWhoUnreadMessages,
              idsOfSendersWhoLeftUnreadMessages:
                senderFilterIdsOfSendersWhoLeftUnreadMessages,
            },
          }, // once i opened the chat with this user i have no more unread messages
          {
            new: true,
          }
        ),
      ]);

      return res.status(200).json(selectedUser);
    } else {
      return res.status(400).json({ message: 'Error selecting user' });
    }
  } catch (error) {
    console.log('🚀 \n\n ~ selectUserForChat ~ error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
export async function unselectUserForChat(req, res) {
  try {
    const myId = req.user._id; //current logged in user
    // this endpoint can make read sent messages from sender by passing his id
    await UserModel.updateOne(
      { _id: myId },
      { $set: { selectedUserToChatWithId: '' } }
    );
  } catch (error) {
    console.log('🚀 \n\n ~ selectUserForChat ~ error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
