import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const server = path.join(dist, "server");
const metadata = path.join(dist, ".openai");
const assets = {};

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(absolute);
    else {
      const route = "/" + path.relative(dist, absolute).replaceAll("\\", "/");
      assets[route] = fs.readFileSync(absolute).toString("base64");
    }
  }
}

collect(dist);
fs.mkdirSync(server, { recursive: true });
fs.mkdirSync(metadata, { recursive: true });
fs.copyFileSync(path.join(root, ".openai", "hosting.json"), path.join(metadata, "hosting.json"));

const entry = `
const assets = ${JSON.stringify(assets)};
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".wasm": "application/wasm", ".svg": "image/svg+xml" };
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const route = assets[url.pathname] ? url.pathname : "/index.html";
    const encoded = assets[route];
    if (!encoded) return new Response("Not found", { status: 404 });
    const bytes = Uint8Array.from(atob(encoded), character => character.charCodeAt(0));
    const extension = route.slice(route.lastIndexOf("."));
    return new Response(bytes, { headers: { "content-type": types[extension] || "application/octet-stream" } });
  }
};
`;
fs.writeFileSync(path.join(server, "index.js"), entry);
