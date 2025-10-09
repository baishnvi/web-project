const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    const filePath = path.join(__dirname, "views", "index.html");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fileContent);
  }

  // Serve static files
  else if (req.url.startsWith("/public/")) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("File not found");
      } else {
        const ext = path.extname(filePath);
        const contentType =
          ext === ".css"
            ? "text/css"
            : ext === ".js"
            ? "application/javascript"
            : "text/plain";
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  }

  // Handle form submission
  else if (req.url === "/message" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const data = JSON.parse(body);
      const { username, email, message } = data;

      // Server-side validation
      if (username.length < 3) {
        return sendJSON(res, { success: false, error: "Name too short" });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return sendJSON(res, { success: false, error: "Invalid email format" });
      }
      if (message.length < 10) {
        return sendJSON(res, { success: false, error: "Message too short" });
      }

      console.log("Received:", data);
      sendJSON(res, { success: true });
    });
  }

  else {
    res.writeHead(404);
    res.end("404 Not Found");
  }
});

function sendJSON(res, obj) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
