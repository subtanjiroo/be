const mongoose = require("mongoose");
const Room = require("../../models/room");

const addRoom = async (req, res) => {
  try {
   
    const dataRequest = req.body.dataRequest;
    const newSeats = dataRequest.seats.map(seat => ({
      seatNumber: seat.seatNumber,
      isOccupied: seat.isOccupied, //lay du lieu rieng tu dataRequest cho seat
    }));
    const RData = await Room.find();
    const newRoom = new Room({
      id: RData.length + 1,
      roomNumber: dataRequest.roomNumber,
      seat: newSeats,
      modifyDate: dataRequest.modifyDate,
      createdDate: dataRequest.createdDate,
    });
    const addedRoom = await newRoom.save();
    return res
      .status(200)
      .send({ code: 200, megs: "luu thanh cong", data: newRoom });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, megs: "luu that bai" });
  }
};
const getRoom = async (req, res) => {
  try {
    const idRoom = req.query.filter;
    var Rooms;
    if (idRoom) {
      Rooms = await Room.findOne({ roomNumber: idRoom });
    } else {
      Rooms = await Room.find();
    }
    if (!Rooms) {
      return res.status(404).json({ code: 404, megs: "room not found" });
    }
    return res.status(200).json({ code: 200, data: Rooms });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, megs: "luu that bai" });
  }
};
module.exports = { addRoom, getRoom};
