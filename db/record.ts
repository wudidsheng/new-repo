import "@/db/db.ts";
import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  clerkId: {
    type: String,
  },
  imageName: { type: String },
});

const recordCollection =
  mongoose.models.Record || mongoose.model("Record", recordSchema);

export { recordCollection };
