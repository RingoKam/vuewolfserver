const {
  fileLoader,
  mergeTypes,
  mergeResolvers
} = require("merge-graphql-schemas");
const path = require("path");
const typesArray = fileLoader(path.join(__dirname, "./schemas"));
const resolversArray = fileLoader(path.join(__dirname, "./resolvers"));
const typeDefs = mergeTypes(typesArray, { all: true });
const resolvers = mergeResolvers(resolversArray);

module.exports = {
  typeDefs,
  resolvers
};
