const http = require("http");
const fs = require("fs");
const path = require("path");

let messages = []; // In-memory "database"

const server = http.createServer((req, res) => {
  // ---- Serve the main page ----
  if (req.url === "/" && req.method === "GET") {
    const filePath = path.join(__dirname, "views", "index.html");
    const html = fs.readFileSync(filePath, "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(html);
  }

  // ---- Serve static files ----
  if (req.url.startsWith("/public/")) {
    const filePath = path.join(__dirname, req.url);
    const ext = path.extname(filePath);
    const contentType =
      ext === ".css"
        ? "text/css"
        : ext === ".js"
        ? "application/javascript"
        : "text/plain";

    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      return res.end(data);
    } catch {
      res.writeHead(404);
      return res.end("Not found");
    }
  }

  // ---- REST API: GET messages ----
  if (req.url === "/api/messages" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ success: true, messages }));
  }

  // ---- REST API: POST message ----
  if (req.url === "/api/messages" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (!data.text || data.text.trim().length < 3) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, error: "Message too short" }));
        }
        const newMsg = { id: Date.now(), text: data.text.trim() };
        messages.push(newMsg);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: newMsg }));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: "Invalid JSON" }));
      }
    });
    return;
  }

  // ---- 404 fallback ----
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

server.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
