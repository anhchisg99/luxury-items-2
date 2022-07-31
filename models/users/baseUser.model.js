import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const baseUserOptions = {
  discriminatorKey: "role",
};

const UserSchema = new Schema(
  {
    ssid: {
      type: String,
    },
    username: {
      type: String,
    },
    full_name: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      // required: true,
    },
    account_status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      // default: 'inactive',
    },
    hash: {
      type: String,
    },
    salt: {
      type: String,
    },
    display_name: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "unknown"],
      default: "unknown",
    },
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    birthday: {
      type: Date,
      default: "2000-01-01Z",
    },
    created_at: {
      type: Date,
      default: () => new Date(),
    },
    default_language: {
      type: String,
      enum: ["en", "vi"],
      default: "en",
    },
    currency: {
      type: String,
      enum: ["VND", "USD"],
      default: "USD",
    },
    avatar: {
      type: String,
      default: "https://firebasestorage.googleapis.com/v0/b/luxury-items.appspot.com/o/User%2Fdefault_avatar.png?alt=media&token=3ababa67-7027-4de4-acd4-f3572264c14a",
    },
    fcm: {
      type: String,
    },
    notification:{
      type:String,
      enum:['enabled','disabled'],
      default:'disabled'
    }
  },
  baseUserOptions
);

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
