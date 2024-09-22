import { dbConnect } from "@/db/dbConnect";
import { Task } from "@/models/task.model";
import mongoose from "mongoose";

export async function DELETE(
  req: Request,
  params: { params: { taskId: string } }
) {
  // const body = req;
  const { taskId } = params.params;

  if (!taskId) {
    return Response.json(
      {
        message: "Task Id required",
        status: 404,
      },
      {
        status: 404,
      }
    );
  }

  try {
    await dbConnect();

    const taskDelete = await Task.findByIdAndDelete(
      new mongoose.Types.ObjectId(taskId)
    );

    if (!taskDelete) {
      Response.json(
        {
          message: "Task do not exists",
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        message: "Task Deleted Successfully",
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
        message: "Error creating a task",
        status: 500,
      },
      {
        status: 500,
      }
    );
  }
}
