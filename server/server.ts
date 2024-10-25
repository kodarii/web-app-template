import { app } from "./src/app.ts";

const ac = new AbortController();

const server = Deno.serve({
    onListen: ({ hostname, port }) => console.log(`%cServer started at http://${hostname}:${port}`),
    port: 3000,
}, app.fetch);

server.finished.then(() => console.log("Server closed"));
ac.abort();
