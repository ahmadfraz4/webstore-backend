const userModel = require("../models/UserModel");
const { roomModel } = require("../models/chat.model");
const { messageModel } = require("../models/messageModel");

require("dotenv").config();

let sendChat = async (req, res) => {
  try {
    let roomId = req.params.room;

    let { chat } = req.body;
    let newChat = await messageModel.create({user:req.user._id, chat, roomId});
    newChat =await newChat.populate('user', '-password')

    res.json({
        success:true, newChat
    })
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};

// get all chats for admin
let fetchChat = async (req,res) => {
    try {
        let allChats = await messageModel.find();
        res.json({
            success:true, allChats
        })
    } catch (error) {
        res.json({
            success:false, error
        })
    }
}

// get chats of specific user

let userChats = async (req,res) =>{
  try {
    let id = req.params.id
    let userMsgs = await messageModel.find({user:id});
    res.json({
      success:true, message:userMsgs
    })
  } catch (error) {
    res.json({
      success:false, error
    })
  }
}

let createRoom = async (req,res) =>{
  try {
    let admin = await userModel.find({role:"admin"});
    let simpleUser = await userModel.findById(req.params.reciever)
    let adminId = admin[0]._id;
    let simpleUser_id = simpleUser._id;
    let reciever;
    if(req.user._id.toString() == adminId.toString()){
      reciever = simpleUser_id
    }else{
      reciever = adminId;
    }
    
    // let bots = reciever!= undefined &&  [req.user._id, reciever];
    let bots = [req.user._id, reciever];
  
    
    let isExist = await roomModel.aggregate([
      {
          $match: {
              users: { $all: bots }
          }
      },
      {
          $addFields: {
              bothArraysSize: { $size: "$users" },
              botsSize: bots.length
          }
      },
      {
          $match: {
              $expr: { $eq: ["$bothArraysSize", "$botsSize"] }
          }
      }
    ]);

    if(isExist.length > 0){
      return res.json({success:true, message : isExist})
    }

    let newRoom = await roomModel.create({users:bots});
    console.log(bots)
   return res.json({
      success:true,message: newRoom
    })
  } catch (error) {
    console.log(error)
    res.json({
      success:false, error
    })
  }
}

let chatsOfRoom = async (req,res) => {
  try {
    let roomId = req.params.roomId;
    let roomMsgs = await messageModel.find({roomId: roomId});
    res.json({
      success:true, 
      roomMsgs
    })   
  } catch (error) {
    res.json({
      success:false, error
    })
  }
}


let allRooms = async (req,res) => {
  try {
    let rooms = await roomModel.find().populate('users','-password');

    res.json({
      success:true, message : rooms
    })    
  } catch (error) {
    console.log(error)
    res.json({
      success:false, error
    })
  }
}
module.exports = {sendChat,fetchChat, userChats, createRoom, chatsOfRoom,allRooms}