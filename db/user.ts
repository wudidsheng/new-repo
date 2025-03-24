import "@/db/db.ts";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  clerkId: {
    type: String,
    unique: true,
  },
  integral: {
    type: Number,
    default: 5,
  },
  good: {
    type: Number,
    default: 2,
  },
});

const userCollection =
  mongoose.models.User || mongoose.model("User", userSchema);

export { userCollection };
