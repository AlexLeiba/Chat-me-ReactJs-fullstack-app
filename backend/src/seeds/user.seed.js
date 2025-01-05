import { config } from 'dotenv';
import { connectDB } from '../lib/db.js';
import userModel from '../models/user.model.js';

config();

export const seedUsers = [
  // Female Users
  {
    email: 'emma.thompson@example.com',
    fullName: 'Emma Thompson',
    password: '123456',
    profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
    favoriteTheme: 'light',
    lastTimeActive: Date.now('2023-01-01T13:00:00.000Z'),
    createdAt: Date.now('2023-01-01T00:00:00.000Z'),
    updatedAt: Date.now('2023-01-01T00:00:00.000Z'),
    idsOfSendersWhoLeftUnreadMessages: [''],
    idsOfReceiversWhoUnreadMessages: [''],
    selectedUserToChatWithId: '',
    sentNewMessageNotification: false,
  },
  {
    email: 'olivia.miller@example.com',
    fullName: 'Olivia Miller',
    password: '123456',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    favoriteTheme: 'light',
    lastTimeActive: Date.now('2023-01-01T13:00:00.000Z'),
    createdAt: Date.now('2023-01-01T00:00:00.000Z'),
    updatedAt: Date.now('2023-01-01T00:00:00.000Z'),
    idsOfSendersWhoLeftUnreadMessages: [''],
    idsOfReceiversWhoUnreadMessages: [''],
    selectedUserToChatWithId: '',
    sentNewMessageNotification: false,
  },
  {
    email: 'sophia.davis@example.com',
    fullName: 'Sophia Davis',
    password: '123456',
    profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg',
    favoriteTheme: 'light',
    lastTimeActive: Date.now('2023-01-01T13:00:00.000Z'),
    createdAt: Date.now('2023-01-01T00:00:00.000Z'),
    updatedAt: Date.now('2023-01-01T00:00:00.000Z'),
    idsOfSendersWhoLeftUnreadMessages: [''],
    idsOfReceiversWhoUnreadMessages: [''],
    selectedUserToChatWithId: '',
    sentNewMessageNotification: false,
  },
  {
    email: 'ava.wilson@example.com',
    fullName: 'Ava Wilson',
    password: '123456',
    profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg',
    favoriteTheme: 'Dark',
    lastTimeActive: Date.now('2023-01-09T12:00:00.000Z'),
    createdAt: Date.now('2023-01-01T00:00:00.000Z'),
    updatedAt: Date.now('2023-01-01T00:00:00.000Z'),
    idsOfSendersWhoLeftUnreadMessages: [''],
    idsOfReceiversWhoUnreadMessages: [''],
    selectedUserToChatWithId: '',
    sentNewMessageNotification: false,
  },
  {
    email: 'isabella.brown@example.com',
    fullName: 'Isabella Brown',
    password: '123456',
    profilePicture: 'https://randomuser.me/api/portraits/women/5.jpg',
    favoriteTheme: 'light',
    lastTimeActive: Date.now('2023-09-01T15:00:00.000Z'),
    createdAt: Date.now('2023-01-01T00:00:00.000Z'),
    updatedAt: Date.now('2023-01-01T00:00:00.000Z'),
    idsOfSendersWhoLeftUnreadMessages: [''],
    idsOfReceiversWhoUnreadMessages: [''],
    selectedUserToChatWithId: '',
    sentNewMessageNotification: false,
  },
  {
    email: 'mia.johnson@example.com',
    fullName: 'Mia Johnson',
    password: '123456',
    profilePicture: 'https://randomuser.me/api/portraits/women/6.jpg',
    favoriteTheme: 'light',
    lastTimeActive: Date.now('2023-01-01T13:00:00.000Z'),
    createdAt: Date.now('2023-01-01T00:00:00.000Z'),
    updatedAt: Date.now('2023-01-01T00:00:00.000Z'),
    idsOfSendersWhoLeftUnreadMessages: [''],
    idsOfReceiversWhoUnreadMessages: [''],
    selectedUserToChatWithId: '',
    sentNewMessageNotification: false,
  },
  {
    email: 'charlotte.williams@example.com',
    fullName: 'Charlotte Williams',
    password: '123456',
    profilePicture: 'https://randomuser.me/api/portraits/women/7.jpg',
    favoriteTheme: 'Dark',
    lastTimeActive: Date.now('2023-10-01T09:00:00.000Z'),
    createdAt: Date.now('2023-01-01T00:00:00.000Z'),
    updatedAt: Date.now('2023-01-01T00:00:00.000Z'),
    idsOfSendersWhoLeftUnreadMessages: [''],
    idsOfReceiversWhoUnreadMessages: [''],
    selectedUserToChatWithId: '',
    sentNewMessageNotification: false,
  },
  {
    email: 'amelia.garcia@example.com',
    fullName: 'Amelia Garcia',
    password: '123456',
    profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
    favoriteTheme: 'light',
    lastTimeActive: Date.now('2023-04-01T11:00:00.000Z'),
    createdAt: Date.now('2023-01-01T00:00:00.000Z'),
    updatedAt: Date.now('2023-01-01T00:00:00.000Z'),
    idsOfSendersWhoLeftUnreadMessages: [''],
    idsOfReceiversWhoUnreadMessages: [''],
    selectedUserToChatWithId: '',
    sentNewMessageNotification: false,
  },

  // Male Users
  {
    email: 'james.anderson@example.com',
    fullName: 'James Anderson',
    password: '123456',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    favoriteTheme: 'Dark',
    lastTimeActive: Date.now('2023-03-01T14:00:00.000Z'),
    createdAt: Date.now('2023-01-01T00:00:00.000Z'),
    updatedAt: Date.now('2023-01-01T00:00:00.000Z'),
    idsOfSendersWhoLeftUnreadMessages: [''],
    idsOfReceiversWhoUnreadMessages: [''],
    selectedUserToChatWithId: '',
    sentNewMessageNotification: false,
  },
];

export const seedDatabase = async () => {
  try {
    await userModel.insertMany(seedUsers);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Call the function
