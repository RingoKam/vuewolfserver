const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

//Data
const { get, newRoom, joinRoom } = require("../../data/room");

//Event
const updateRoom = "UpdateRoom";

module.exports = {
  Query: {
    getRoom: (root, args, context) => {
      return get();
    }
  },
  Mutation: {
    newRoom: (root, { roomName, playerId }, context) => {
      const room = newRoom(roomName, playerId);
      pubsub.publish(updateRoom, room);
      return room.id;
    },
    joinRoom: (root, { roomId, playerId }, context) => {
      const room = joinRoom(roomId, playerId);
      pubsub.publish(updateRoom, room);
      return roomId;
    }
  },
  Subscription: {
    updateRoom: {
      subscribe: () => pubsub.asyncIterator([updateRoom])
    }
  }
};
