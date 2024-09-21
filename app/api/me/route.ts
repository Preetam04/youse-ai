export async function GET(req: Request, res) {
  try {
    // const token = req.user;

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
