import { Hono } from "hono";

const projects = new Hono();

projects.get("/", (c) => {
  c.status(200);
  return c.json({ body: [], status: 200 });
});

projects.get("/:id{[0-9]+}", (c) => {
  return c.json({
    data: [],
    message: `Returns a single project with ID: ${c.req.param("id")}`,
  });
});

projects.post("/", (c) => {
  return c.json({ data: [], message: "Creates a new project" });
});

projects.patch("/:id{[0-9]+}", (c) => {
  return c.json({
    data: [],
    message: `Updates a project with ID: ${c.req.param("id")}`,
  });
});

projects.delete("/:id{[0-9]+}", (c) => {
  return c.json({
    data: [],
    message: `Deletes a project with ID: ${c.req.param("id")}`,
  });
});

export default projects;
