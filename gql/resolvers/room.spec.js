// const mock = require("mock-require");
// const chai = require("chai");

// // mock("../../data/room", {
// //     get: id => {},
// //     newRoom: (roomName, player) => {},
// //     joinRoom: (roomId, player) => {},
// //     updateRoom: (roomId, updatedRoom) => {}
// // });
// const room = require("./room.js");

// function createFakeRoom(id) {
//     return {
//         id,
//         name: `room${id}`,
//         player: new Map().set(id, { id, name }),
//         isReady: false
//     };
// }

// describe("Query", () => {
//     describe("getRoom", () => {
        
//         before(() => {      
//             [1,2,3,4,5].map()      
//         });

//         after(() => {
//         });

//         const r = room.Query.getRoom(null, { roomId: 1 }, null);

//         it("should return room when a room with existing id", () => {
//             chai.assert(r.id === 1, "id is the same");
//         });
       
//     });
// });
