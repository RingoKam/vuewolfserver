const { PubSub } = require("apollo-server");
const { withFilter } = require("apollo-server");
const pubsub = new PubSub();
const _ = require("lodash");

//Data
const { get, newRoom, joinRoom } = require("../../data/room");
const player = require("../../data/player");

//Event
const updateRoom = "UpdateRoom";

module.exports = {
    Query: {
        getRoom: (root, { roomId }, context) => {
            const r = get(roomId);
            const p = player.get();
            return r;
        }
    },
    Mutation: {
        newRoom: (root, { roomName, player }, context) => {
            const room = newRoom(roomName, player);
            pubsub.publish(updateRoom, { updateRoom: room });
            return room.id;
        },
        joinRoom: (root, { roomId, player }, context) => {
            const room = joinRoom(roomId, player);
            pubsub.publish(updateRoom, { updateRoom: room });
            return roomId;
        },
        removePlayer: (root, {roomId, playerId}, context) => {
            return playerId;
        },
        startGame(root, { roomId }, context) {
            return playerId;
        }

    },
    Subscription: {
        updateRoom: {
            subscribe: withFilter(
                () => pubsub.asyncIterator([updateRoom]), 
                (payload, variable) => {
                    const payloadRoomId = _.get(payload, "updateRoom.roomId", false);
                    const isSameRoom = payloadRoomId === variable.roomId;
                    const provideFilter = !!variable.roomId;
                    return isSameRoom || !provideFilter;
                }
            )
            // subscribe: () => pubsub.asyncIterator([updateRoom], withFilter)
        }
    }
};
