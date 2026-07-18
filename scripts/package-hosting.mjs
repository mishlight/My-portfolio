import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const server = path.join(dist, "server");
const metadata = path.join(dist, ".openai");
fs.mkdirSync(server, { recursive: true });
fs.mkdirSync(metadata, { recursive: true });
fs.copyFileSync(path.join(root, ".openai", "hosting.json"), path.join(metadata, "hosting.json"));

const entry = `
export default {
  async fetch(request, env) {
    if (env?.ASSETS?.fetch) return env.ASSETS.fetch(request);
    return new Response("Portfolio assets are unavailable.", { status: 503 });
  }
};
`;
fs.writeFileSync(path.join(server, "index.js"), entry);
