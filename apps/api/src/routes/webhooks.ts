import { Hono } from "hono";
import { Webhook } from "svix";

const webhooks = new Hono().post("/", async (c) => {
  const SIGNING_SECRET = process.env.SIGNING_SECRET as string;
  if (!SIGNING_SECRET) {
    // send error to expection tracking service
    throw new Error("Error: Please add SIGNING_SECRET from Clerk Dashboard");
  }

  const hook = new Webhook(SIGNING_SECRET);

  const payload = await c.req.text();
  console.log(payload);

  const svixId = c.req.header("svix-id");
  const svixTimestamp = c.req.header("svix-timestamp");
  const svixSignature = c.req.header("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    // send error to error tracking service
    console.log("Error: Missing svix headers");

    return c.json(
      {
        message: "Error: Missing svix headers",
      },
      400,
    );
  }

  let event: any;

  try {
    event = hook.verify(payload, {
      "svix-id": svixId as string,
      "svix-timestamp": svixTimestamp as string,
      "svix-signature": svixSignature as string,
    });
  } catch (err) {
    console.log("Error: Could not verify webhook:", err);
    return c.json(
      {
        message: "Error: Could not verify webhook",
      },
      400,
    );
  }

  const { id } = event.data;
  const eventType = event.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", event.data);

  return c.json(
    {
      message: "Webhook received",
    },
    200,
  );
});

export default webhooks;
