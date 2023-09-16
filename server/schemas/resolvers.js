// import models and modules
const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// define resolvers for schema
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // check if there's a user in the context (authentication)
        const userData = await User.findOne({ _id: context.user._id }); // find user by their _id
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }); // find user by email

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password); // check if provided password is correct

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user); // generate JSON Web Token (JWT) for user
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args); // create new user based on provided arguments
      const token = signToken(user); // generate JWT for new user
      return { token, user };
    },
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id }, // find user by _id
          { $push: { savedBooks: input } }, // push 'input' book data into 'savedBooks' array
          { new: true } // return updated user data
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to save a book.');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } }, // remove book with specified 'bookId' from 'savedBooks'
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError(
        'You need to be logged in to remove a book'
      );
    },
  },
};

module.exports = resolvers;
