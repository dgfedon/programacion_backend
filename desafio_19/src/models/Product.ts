import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      unique: true,
   },
   price: {
      type: String,
      required: true,
   },
   thumbnail: String,
})

export const ProductModel = mongoose.model('Product', ProductSchema);

