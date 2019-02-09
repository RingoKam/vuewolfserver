const chai = require("chai");
const room = require("./room");

describe("room", () => {
    const player = {
        id: 12345,
        name: "testingPlayer"
    };

    describe("newRoom", () => {
        const newRoom = room.newRoom("newRoom", player);

        it("should return a new room", () => {
            chai.assert(newRoom !== null);
        });

        it("should be named the same as the param", () => {
            chai.assert(newRoom.name === "newRoom");
        });

        it("should persist the room", () => {
            const r = room.get(newRoom.id);
            chai.assert(r.id === newRoom.id);
        });
    });

    describe("joinRoom", () => {
        const createdRoom = room.newRoom("testing", player);
        const player2 = {
            id: 23456,
            name: "testingPlayer"
        };
        room.joinRoom(createdRoom.id, player2);
        const joinedRoom = room.get(createdRoom.id);
        const r = joinedRoom.players.get(player2.id);

        it("should add the player", () => {
            chai.assert(r.id === player2.id);
            chai.assert(r.name === player.name);
        });

        it("should return the correct number of player", () => {
            chai.assert(joinedRoom.players.size === 2);
        })
    });

    describe("updateRoom", () => {
        const createdRoom = room.newRoom("testing", player);
        const updatedRoom = {
            id: createdRoom.id,
            name: "updated room",
            players: [],
            isPlaying: false 
        };

        room.updateRoom(createdRoom.id, updatedRoom);
        const r = room.get(createdRoom.id);

        it("should replace the room", () => {
            chai.assert(r.id === createdRoom.id); 
            chai.assert(r.name === updatedRoom.name); 
            chai.assert(r.players === updatedRoom.players); 
            chai.assert(r.isPlaying === updatedRoom.isPlaying); 
        });
    });
});
