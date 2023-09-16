import { gql } from '@apollo/client';

// GraphQL mutation to add a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      # when mutation is successful, it returns a token and user data
      token # auth token for new user
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;

// Graphql mutation to log in a user
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      # when the login mutation is successful, it returns a token and user data
      token # auth token for the logged-in user
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;

// GraphQL mutation to save a book to user's account
export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBOok(bookData: $bookData) {
      # when a book is successfully saved, returns user data
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// GraphQL mutation to remove book from user's account
export const REMOVE_BOOK = gql`
  mutation remoeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      # when a book is successfully removed, it returns user data
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
