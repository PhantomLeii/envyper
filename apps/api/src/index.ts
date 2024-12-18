import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";

const hono = new Hono()

hono.use(etag(), logger())

hono.get("/", (c) => {
  return c.json({ message: "Hello World" })
})

export const server = Bun.serve({
  fetch: hono.fetch,
})

console.log(`Listening at ${server.url.href}`)