const http = require("node:http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 3000);

const app = next({ dev, hostname: host, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = http.createServer((req, res) => {
      void handle(req, res);
    });
    server.listen(port, host, () => {
      console.log(`> Next server running on http://${host}:${port}`);
    });
  })
  .catch((err) => {
    console.error("> Failed to start Next server", err);
    process.exit(1);
  });
