import { Handlers, HandlerContext } from "$fresh/server.ts";
import db from "../../Database.ts";
import { readJson, isValidName, isValidPubkey } from "../../utils.ts";

interface IData {
  name: string;
  pubKey: string;
}

export const handler: Handlers = {
  async POST(req: Request, _ctx: HandlerContext): Promise<Response> {
    const payload = req.body;

    if (payload === null) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const json: IData | undefined = await readJson(payload);

    if (json && json.name && json.pubKey) {
      if (!isValidName(json.name) || !isValidPubkey(json.pubKey)) {
        return Response.json(
          { error: "Invalid username or pubkey" },
          { status: 400 }
        );
      }

      if (!(await checkName(json.name))) {
        await db.value.set(json.name, json.pubKey);
        return Response.json(
          {
            name: json.name,
            pubKey: json.pubKey,
            success: true,
          },
          { status: 201 }
        );
      } else {
        return Response.json({ error: "Name is taken" }, { status: 409 });
      }
    } else {
      return Response.json(
        { error: "Name and private key is required" },
        { status: 400 }
      );
    }
  },

  async GET(req: Request, _ctx: HandlerContext): Promise<Response> {
    let available = false;
    const name: string = new URL(req.url).searchParams.get("name") || "";

    if (!isValidName(name)) {
      return Response.json(
        { error: "Name can be only: a-z0-9" },
        { status: 400 }
      );
    }

    const data = await checkName(name);

    if (!data) {
      available = true;
    }

    return Response.json({ available });
  },
};

const checkName = async (name: string) => {
  if (name) {
    const data = await db.value.get(name);
    return data ? true : false;
  }
};
