import { Hono } from "hono";

const hono = new Hono().post("/", async (c) =>
  c.json({ message: "Hello from the webhook!" }),
);

export default hono;
