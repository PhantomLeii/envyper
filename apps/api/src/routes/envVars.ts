import { createEnvVariable } from "@envyper/orm/envVars";
import { CreateEnvVariableSchema } from "@envyper/zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const envVars = new Hono()
  .post(
    "/",
    zValidator("json", CreateEnvVariableSchema.omit({ projectId: true })),
    async (c) => {
      const data = c.req.valid("json");

      const variable = await createEnvVariable({ ...data, projectId: 1 });
      console.log(variable);

      return c.json({ data: variable }, 201);
    },
  )

  .patch("/:id{[0-9]+}", async (c) => {
    return c.json({ error: "Not implemented" }, 501);
  })

  .get("/", async (c) => {
    return c.json({ error: "Not implemented" }, 501);
  })

  .get("/:id{[0-9]+}", async (c) => {
    return c.json({ error: "Not implemented" }, 501);
  })

  .delete("/:id{[0-9]+}", async (c) => {
    return c.json({ error: "Not implemented" }, 501);
  });

export default envVars;
