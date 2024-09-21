import { dbConnect } from "@/db/dbConnect";
import { User } from "@/models/user.model";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    await dbConnect();

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return Response.json(
        {
          message: "No user found with this email",
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return Response.json(
        {
          message: "Password is Incorrect",
          status: 404,
        },
        {
          status: 404,
        }
      );
    }

    const loggedInUser = await User.findById(user._id).select(
      "-password, -__v"
    );

    if (loggedInUser) {
      const accessToken = loggedInUser.generateAccessToken();

      return Response.json(
        {
          message: "User Logged in successfully",
          data: {
            loggedInUser,
            token: accessToken,
          },
          status: 201,
        },
        {
          status: 201,
        }
      );
    } else {
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
