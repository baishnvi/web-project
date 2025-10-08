const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const filePath = path.join(__dirname, "views", "index.html");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    res.end(fileContent);
  }

  else if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", chunk => body.push(chunk));
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      // Server-side validation
      if (!message || message.trim() === "" || message.length > 100) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.write(`<h1 class="error">Invalid message! Please enter 1-100 characters.</h1>`);
        res.write(`<a href="/" class="back-link">Go Back</a>`);
        res.end();
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<h2 class="success">Message Received: ${message}</h2>`);
      res.write(`<a href="/" class="back-link">Go Back</a>`);
      res.end();
    });
  }

  else if (req.url.startsWith("/public/")) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("File not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  }

  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
  }

});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
