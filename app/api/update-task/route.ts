import { dbConnect } from "@/db/dbConnect";
import { Task } from "@/models/task.model";
import mongoose from "mongoose";

export async function PUT(req: Request) {
  const { id, description, status, priority, dueDate } = await req.json();

  if (!id) {
    return Response.json(
      {
        message: "Please provide Valid Task ID",
        status: 404,
      },
      {
        status: 404,
      }
    );
  }

  try {
    await dbConnect();

    const taskExists = await Task.findById(new mongoose.Types.ObjectId(id));

    if (!taskExists) {
      return Response.json(
        {
          message: "Task does not exists",
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskExists._id,
      {
        $set: {
          description: description || taskExists.description,
          status: status || taskExists.status,
          priority: priority || taskExists.priority,
          dueDate: dueDate || taskExists.dueDate,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedTask) {
      return Response.json(
        {
          message: "Error updating a task",
          status: 500,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      {
        message: "Task Updated Successfully",
        updatedTask,
        status: 201,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    // console.log(error);

    return Response.json(
      {
        message: "Something went wrong",
        status: 500,
      },
      {
        status: 500,
      }
    );
  }
}
