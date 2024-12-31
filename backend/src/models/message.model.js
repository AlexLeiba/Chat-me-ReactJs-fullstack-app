import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', //will be a reference to the user model
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', //will be a reference to the user model
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    receiverRead: {
      type: Boolean,
      default: false,
    },
    senderRead: {
      type: Boolean,
      default: false,
    },
    isSelectedUserToChatWith: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
