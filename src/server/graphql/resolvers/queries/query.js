import {getUserByEmail} from '../../controllers/authorization';


export const author = async (r, {name}, ctx) => {
  const user = await getUserByEmail(name);
  return `${user} and ${ctx.user}`;
};

export const getTest = (root, {testString}) => `fuck you ${testString}`;


