import { Hono } from "hono";

const projects = new Hono()

  .get("/", (c) => {
    c.status(200);
    return c.json({ body: [], status: 200 });
  })

  .get("/:id{[0-9]+}", (c) => {
    return c.json({
      data: [],
      message: `Returns a single project with ID: ${c.req.param("id")}`,
    });
  })

  .post("/", (c) => {
    return c.json({ data: [], message: "Creates a new project" });
  })

  .patch("/:id{[0-9]+}", (c) => {
    return c.json({
      data: [],
      message: `Updates a project with ID: ${c.req.param("id")}`,
    });
  })

  .delete("/:id{[0-9]+}", (c) => {
    return c.json({
      data: [],
      message: `Deletes a project with ID: ${c.req.param("id")}`,
    });
  });

export default projects;
