import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    sentNewMessageNotification: {
      type: Boolean,
      default: false,
    },
    selectedUserToChatWithId: {
      type: String,
      default: '',
    },
    idsOfSendersWhoLeftUnreadMessages: {
      type: Array,
      default: [''],
    },
    idsOfReceiversWhoUnreadMessages: {
      type: Array,
      default: [''],
    },
  },
  {
    timestamps: true, // add createdAt and updatedAt fields
  }
);

export default mongoose.model('User', userSchema);
