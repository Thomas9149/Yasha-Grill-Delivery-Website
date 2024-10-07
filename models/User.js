import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    // Bio becomes postcode and job becomes address following
    /*
db.collection_name.updateMany(
   {},
   { $rename: { "job": "address" } }
)
    db.users.updateMany(
   {},
   { $rename: { "bio": "postcode" } }
)

db.users.updateMany(
   {},
   { $set: { postcode: "" } }
)
     */
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    postcode: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
