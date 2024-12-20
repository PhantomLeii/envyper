import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CreateProjectSchema, User } from "@envyper/zod";
import { createProject } from "@envyper/orm/projects";
import { getUser } from "@envyper/orm/utils";

const projects = new Hono()

  .post(
    "/",
    zValidator("json", CreateProjectSchema.omit({ creatorId: true })),
    async (c) => {
      const { name, description } = c.req.valid("json");

      const user: User | null = await getUser("test-user");
      if (!user) {
        return c.json({ error: "User not found" }, 401);
      }

      const project = await createProject({
        name,
        description,
        creatorId: user?.id as number,
      });

      if (!project) {
        return c.json({ error: "Failed to create project" }, 500);
      }

      return c.json({ data: project }, 201);
    },
  )

  .get("/", (c) => c.json({ data: [] }, 200))

  .get("/:id{[0-9]+}", (c) => c.json({ data: {} }, 200))

  .patch("/:id{[0-9]+}", (c) => c.json({ data: {} }, 200))

  .delete("/:id{[0-9]+}", (c) => c.json({ data: {} }, 200));

export default projects;
