import mongoose, { Model, Schema } from "mongoose";
import { string } from "zod";

export enum StatusType {
  "To Do",
  "In Progress",
  "Completed",
}

export enum PriorityType {
  "High",
  "Medium",
  "Low",
}

interface Task extends Document {
  user: string;
  name: string;
  description: string;
  status: StatusType;
  priority: PriorityType;
  dueDate: Date;
}

const defaultDueDate = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 2); // Add 2 days
  return currentDate;
};

const taskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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
    dueDate: {
      type: Date, // Date field for task due date
      default: defaultDueDate(),
    },
  },
  {
    timestamps: true,
  }
);

export const Task: Model<Task> =
  mongoose.models.Task || mongoose.model<Task>("Task", taskSchema);
