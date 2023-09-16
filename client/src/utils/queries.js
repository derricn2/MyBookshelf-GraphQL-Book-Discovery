import { gql } from '@apollo/client';

// GraphQL query for fetching user data
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      saveBooks {
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
