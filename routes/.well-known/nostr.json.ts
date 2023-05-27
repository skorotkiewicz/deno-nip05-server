import { Handlers, HandlerContext } from "$fresh/server.ts";
import db from "../../Database.ts";

export const handler: Handlers = {
  async GET(req: Request, _ctx: HandlerContext): Promise<Response> {
    const name: string = new URL(req.url).searchParams.get("name") || "";

    const data: string = name
      ? { [name]: await db.value.get(name) }
      : await db.value.all();

    const json = {
      names: Object.fromEntries(Object.entries(data).sort()),
    };

    return Response.json(json, { status: 200 });
  },
};
