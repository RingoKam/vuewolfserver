let rooms = [];

async function get() {
  if (!rooms) {
    //get from database here
  }
  return rooms;
}

async function newRoom(roomName, player) {
  get();
  const id = new Date().getTime();
  const newRoom = {
    id,
    name: roomName,
    players: [player],
    isPlaying: false
  };
  rooms.unshift(newRoom);
  setTimeout(() => {
    //update database
  }, 0);
  return newRoom;
}

async function joinRoom(roomId, playerId) {
  get();
  roomId = parseInt(roomId);
  const room = rooms.find(room => room.id === roomId);
  room.players.push(playerId);
  setTimeout(() => {
    //update database here
  }, 0);
  return room;
}

module.exports = {
  get,
  newRoom,
  joinRoom
};
