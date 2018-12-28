const { PubSub } = require("apollo-server");
const { withFilter } = require("apollo-server");
const pubsub = new PubSub();
const _ = require("lodash");

//Data
const { get, newRoom, joinRoom, updateRoom } = require("../../data/room");
const player = require("../../data/player");

//Event
const event = {
    updateRoom: "UpdateRoom",
    startGame: "StartGame" 
}

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
            pubsub.publish(event.updateRoom, { updateRoom: room });
            return room.id;
        },
        joinRoom: (root, { roomId, player }, context) => {
            const room = joinRoom(roomId, player);
            pubsub.publish(event.updateRoom, { updateRoom: room });
            return roomId;
        },
        removePlayer: (root, {roomId, playerId}, context) => {
            return playerId;
        },
        readyPlayer: (root, { roomId, playerId }, context) =>  {
            const targetRoom = get(roomId);
            const targetPlayer = targetRoom.players.find(player => player.id);
            targetPlayer.isReady = true;
            //check if all 7 player is ready, start game if so. 
            if(targetRoom.players.filter(player => player.ready).length == 7) {
                targetRoom.isPlaying = true;
                pubsub.publish(event.startGame, { id: roomId });
            }
            const updatedRoom = updateRoom(targetRoom);
            return roomId;
        }
    },
    Subscription: {
        updateRoom: {
            subscribe: withFilter(
                () => pubsub.asyncIterator([event.updateRoom]), 
                (payload, variable) => { //payload is the published value, variable is the param
                    //if variable is supplied, but no payload
                    //first time subscribe and no event are emitted.
                    const payloadRoomId = _.get(payload, "updateRoom.id", false);
                    const requestedRoomId = _.get(variable, "roomId", false);
                    if(requestedRoomId === false) {
                        return true;
                    }
                    //provided payload and new event are pushed out
                    else {
                        const isSameRoom = payloadRoomId.toString() === requestedRoomId.toString();
                        return isSameRoom;
                    }
                }
            )
        }, startGame: {
            subscribe: withFilter(
                () => pubsub.asyncIterator([event.startGame]), 
                (payload, variable) => {
                    if(payload == null) {
                        return true;
                    } 
                    const requestedRoomId = _.get(variable, "roomId", false);
                    const payloadRoomId = _.get(payload, "id", false);
                    return requestedRoomId === payloadRoomId;
                }
            )
        }
    }
};
