import { dbConnect } from "@/db/dbConnect";
import { Task } from "@/models/task.model";

export async function POST(req: Request) {
  const { user, name, description, status, priority, dueDate } =
    await req.json();

  try {
    await dbConnect();
    console.log(user, name, description, status, priority);

    if (!name) {
      return Response.json(
        {
          message: "Task name is required",
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    const createdTask = await Task.create({
      user,
      name,
      description,
      status,
      priority,
      dueDate,
    });

    if (!createdTask) {
      Response.json(
        {
          message: "Error creating task",

          status: 500,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      {
        message: "Task created Successfully",
        createdTask,
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
