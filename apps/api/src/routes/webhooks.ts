import { Hono } from "hono";

const webhooks = new Hono().post("/", async (c) => {
  console.dir(await c.req.json());
  return c.json({ data: await c.req.json(), message: "Webhook received!" });
});

export default webhooks;
