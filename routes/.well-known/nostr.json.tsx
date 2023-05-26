import { Handlers, HandlerContext } from "$fresh/server.ts";
import db from "../../Database.ts";

export const handler: Handlers = {
  async GET(req: Request, _ctx: HandlerContext): Promise<Response> {
    const name: string = new URL(req.url).searchParams.get("name") || "";

    if (!name) {
      return Response.json({ error: "Please provide name" }, { status: 400 });
    }

    const data: string = await db.value.get(name);

    if (data) {
      const res = { names: { [name]: data } };
      return Response.json(res, { status: 200 });
    } else {
      const res = { error: "Name not found." };
      return Response.json(res, { status: 404 });
    }
  },
};
