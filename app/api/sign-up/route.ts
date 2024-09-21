import { dbConnect } from "@/db/dbConnect";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return Response.json(
        {
          message: "Please provide valid Data",
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    const userExists = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (userExists) {
      return Response.json(
        {
          message: "User with similar username or email already exists",
          status: 409,
        },
        {
          status: 409,
        }
      );
    }

    const createdUser = await User.create({
      username,
      email,
      password,
    });

    if (!createdUser) {
      Response.json(
        {
          message: "Error Creating User",
          status: 500,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      {
        message: "User Registered Successfully",
        status: 201,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

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
