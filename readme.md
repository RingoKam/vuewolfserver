# Werewolf Workshop Design Doc

## Game Rules

### We have couple roles (min of 7 Players)
* Villagers (3 or more)
* Doctor (1 max)
* Werewolf (2 or more)
* Seer (1 max)

### Round proceed with day night cycle (begin at night)
1. Werewolfs are aware of each other, pick a target to kill (unknown to other)
2. Doctor pick a person to heal (unknown to other)
3. Seers reveal a target, and check their role (unknown to other)
4. Night cycle end, if doctor fail to heal person chosen by werewolf, he/she dies.
5. Day begin, living player discuss among themselves and see who is the werewolf, once a player is chosen to be killed, game check if human/werewolf has won, if not, game continues.

## Game Design
> Game should be separate into 2 state. Lobby State and Game Session State.

### Lobby State
Lobby state should have 2 page:
1. room list where you can pick a room (game session) and
2. room itself, where you wait for the room to be filled up and start the game.

Each session should have its unique ID so its state can be easily located in storage. It should also be exposed via URL, so user can potentially:
1. rejoin the same room if dced.
2. copy url and forward to friend so they can join the same room.

Once a room has gather min of 7 players, game can start!

> Room List
```typescript
{
  data: [{
    id: "157848",
    name: "Ringo favorite lobby",
    playerCount: 1
  }, ...]
}
```

> Room
```typescript
{
  data: [{
    playerId: "1234567",
    userName: "Ringo",
    isReady: false,
  }, ...]
}
```

### Game State
Game State are separated by day/night cycle.

#### Night Cycle
Night cycle plays out in the following order
1. Werewolf
2. Doctor
3. Seer

Its important to keep each phase timing consistent, regardless if player with that role is alive or not.
1. 45 seconds for werewolf
2. 30 seconds for doctor
3. 45 seconds for seer
timer should be run on server side, and emit to clients when done.

##### Werewolf turn
Werewolf should see each other as werewolf. and be able to click and vote for the user they want to kill. werewolf must come into an agreement on who to kill, if tie or no pick, no 1 dies.

##### Doctor turn
Doctor can choose one player to heal. doctor won't know result until night cycle ends.

##### Seer turn
Seer can choose one player to reveal his/her role. Seer know the result immediately and role remain shown to seer throughout rest of the game.

##### Night Cycle End
Reveals who is killed and if doctor is able to save that player. Check game Status
1. If `seer + doctor + villagers > werewolf`, game continues.
2. otherwise, game ends and character roles are revealed.

#### Day Cycle
Day cycle is relatively simple, every user will have 1 vote, players who got majority vote on dies.

##### Day Cycle End
Reveal who is killed.
1. If `seer + doctor + villagers > werewolf`, game continues.
2. otherwise, game ends and character roles are revealed.

### Random bits
what happen when user dced from game?
easy way: kill the game.
meh way: wait for player to rejoin (with a timer, when time runs out, kill the game)
hard way: replace with AI ( need to write AI )

