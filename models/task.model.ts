import mongoose, { Model, Schema } from "mongoose";
import { string } from "zod";

interface Task extends Document {
  name: string;
  description: string;
  status: 
}

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["High", "Low", "Medium"],
      default: "To Do",
    },
  },
  {
    timestamps: true,
  }
);

export const Task: Model<Task> =
  mongoose.models.Task || mongoose.model<Task>("Task", taskSchema);
