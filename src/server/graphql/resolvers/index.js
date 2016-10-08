// import {getUserByEmail} from './helper';
import {author, getTest} from './queries/query';
import {postAuthor, registerUser} from './mutations/authorization';
export default {
  Query: {
    author,
    getTest,
  },
  Mutation: {
    postAuthor,
    registerUser,
  },
};
