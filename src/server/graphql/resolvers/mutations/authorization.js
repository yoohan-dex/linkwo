import {registerAccount} from '../../controllers/authorization';


export const postAuthor = (r, {name}) => `fuck you ${name}`;
export const registerUser = (r, {email, password}) => registerAccount(email, password);
