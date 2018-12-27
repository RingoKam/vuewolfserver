let rooms = [];

function get(id) {
  if (!rooms) {
    //get from database here
  }
  return !!id ? rooms.filter(r => r.id === parseInt(id)) : rooms;
}

function newRoom(roomName, player) {
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

function joinRoom(roomId, playerId) {
  get();
  roomId = parseInt(roomId);
  const room = rooms.find(room => room.id === roomId);
  room.players.push(playerId);
  setTimeout(() => {
    //update database here
  }, 0);
  return room;
}

function updateRoom(roomId, updatedRoom) {
  get();
  roomId = parseInt(roomId);
  const i = rooms.findIndex(room => room.id === roomId);
  rooms[i] = updatedRoom;
  return updatedRoom;
}

module.exports = {
  get,
  newRoom,
  joinRoom,
  updateRoom
};
