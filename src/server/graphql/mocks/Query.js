export default () => ({
  author: (root, args) => ({
    firstName: args.name,
    lastName: 'yoo',
  }),
});
