import { dbConnect } from "@/db/dbConnect";
import { User } from "@/models/user.model";
import mongoose from "mongoose";

const getToken = async () => {
  //   const session: any = await getServerSession(authOptions);
  //   let token;
  //   if (session && session.jwt) {
  //     token = session.jwt;
  //   }
  //   return token;
};

export async function GET(req: Request, res) {
  try {
    await dbConnect();
    const userData = JSON.parse(req.headers.get("user") as string);

    // console.log(userData);

    const user = await User.findById(
      new mongoose.Types.ObjectId(userData._id)
    ).select("-password -__v");

    // const token = req.user;
    // const session = await getToken();
    // console.log(session);

    // console.log(session);

    return Response.json(
      {
        message: "User Data",
        user,
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
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
