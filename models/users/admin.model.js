import mongoose from "mongoose";
import User from "./baseUser.model.js";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const AdminSchema = new Schema({
  isAdmin: {
    type: Boolean,
    required: true,
    default: true
  },
  
});

const AdminModel = User.discriminator("admin", AdminSchema);

export default AdminModel;
