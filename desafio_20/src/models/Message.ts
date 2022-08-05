import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema({
   author: {
      id: String,
      name: String,
      lastname: String,
      alias: String,
      age: Number,
      avatar: String,
   },
   text: {
      type: String,
      required: true,
   },
   date: Date,
})

export const MessageModel = mongoose.model('Message', MessageSchema);

