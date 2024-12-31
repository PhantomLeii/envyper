import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

import projects from "./routes/projects";
import envVars from "./routes/envVars";
import webhooks from "./routes/webhooks";

const isProd = process.env.NODE_ENV === "production";

const app = new Hono().basePath("/api");

app.use(etag(), logger());
app.use(
  "/api/*",
  cors({
    origin: [isProd ? (process.env.CLIENT_URL as string) : "*"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.route("/projects", projects);
app.route("/variables", envVars);
app.route("/webhooks", webhooks);

const server = Bun.serve({
  fetch: app.fetch,
});

if (!isProd) {
  console.log("Listening at", server.url.href);
}
