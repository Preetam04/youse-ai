import { Task } from "@/models/task.model";
import mongoose from "mongoose";

export async function GET(req: Request) {
  const userData = JSON.parse(req.headers.get("user") as string);

  try {
    console.log(userData);

    const tasks = await Task.find({ user: userData._id }).select("-user");

    console.log(tasks);

    return Response.json(
      {
        message: "All tasks fetched succesfully",
        tasks,
        status: 200,
      },
      {
        status: 200,
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
