import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CreateProjectSchema, User } from "@envyper/zod";
import { createProject } from "@envyper/orm/projects";
import { getUser } from "@envyper/orm/utils";

const projects = new Hono()

  .get("/", (c) => c.json({ data: [] }, 200))

  .get("/:id{[0-9]+}", (c) => c.json({ data: {} }, 200))

  .post("/", zValidator("form", CreateProjectSchema), async (c) => {
    try {
      const { name, description } = c.req.valid("form");
      const user: User | null = await getUser("test-user");

      const project = await createProject({
        name,
        description,
        creatorId: user?.id as bigint,
      });

      return c.json({ data: project }, 201);
    } catch (error) {
      return c.json({ error: "Something went wrong" }, 400);
    }
  })

  .patch("/:id{[0-9]+}", (c) => c.json({ data: {} }, 200))

  .delete("/:id{[0-9]+}", (c) => c.json({ data: {} }, 200));

export default projects;
