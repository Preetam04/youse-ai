import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

const getToken = async () => {
  const session: any = await getServerSession(authOptions);
  let token;
  if (session && session.jwt) {
    token = session.jwt;
  }
  return token;
};

export async function GET(req: Request, res) {
  try {
    // const token = req.user;
    const session = await getToken();
    console.log(session);

    console.log(session);

    return Response.json(
      {
        message: "User Data",
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
