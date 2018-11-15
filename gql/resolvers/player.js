const { get, post } = require("../../data/player");

module.exports = {
  Query: {
    getPlayers: (root, args, context) => {
      return get();
    }
  },
  Mutation: {
    newPlayer: (root, { name }, context) => {
      return post(name);
    }
  }
};
