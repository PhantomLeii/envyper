import { Hono } from "hono";

const projects = new Hono()

  .get("/", (c) => c.json({ data: [] }, 200))

  .get("/:id{[0-9]+}", (c) => c.json({ data: {} }, 200))

  .post("/", (c) => c.json({ data: {} }, 201))

  .patch("/:id{[0-9]+}", (c) => c.json({ data: {} }, 200))

  .delete("/:id{[0-9]+}", (c) => c.json({ data: {} }, 200));

export default projects;
