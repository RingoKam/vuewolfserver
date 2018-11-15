let players = [];

function get() {
  if (!players) {
    //get from database here
  }
  return players;
}

function post(name) {
  get();
  const id = new Date().getTime();
  const player = { id, name };
  players.unshift(player);
  setTimeout(() => {
    //update database here
  }, 0);
  return player;
}

module.exports = { get, post };
