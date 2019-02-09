let rooms = new Map();

function get(id) {
  if (!rooms.values) {
    //get from database here
  }
  return !!id ? rooms.get(id) : rooms.values();
}

function newRoom(roomName, player) {
  get();
  const id = new Date().getTime();
  const playerMap = new Map().set(player.id, player);
  const newRoom = {
    id,
    name: roomName,
    players: playerMap,
    isPlaying: false
  };
  rooms.set(id, newRoom);
  setTimeout(() => {
    //update database
  }, 0);
  return newRoom;
}

function joinRoom(roomId, player) {
  get();
  const room = rooms.get(roomId);
  room.players.set(player.id, player);
  setTimeout(() => {
    //update database here
  }, 0);
  return room;
}

function updateRoom(roomId, updatedRoom) {
  get();
  rooms.set(roomId, updatedRoom);
  return rooms.get(roomId);
}

module.exports = {
  get,
  newRoom,
  joinRoom,
  updateRoom
};
