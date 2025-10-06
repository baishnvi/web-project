const http = require("http");
const fs = require("fs"); 

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>I'm the server</h1>");
    

    res.write("<form action='/message' method='POST'>");
    res.write("<input type='text' name='msg'>");
    res.write("<button type='submit'>Submit</button>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } 
  
  else if (req.url === "/message" && req.method === "POST") {
    const ar = [];

    req.on("data", (chunk) => {
      ar.push(chunk);
    });

    req.on("end", () => {
      const str = Buffer.concat(ar).toString();
      const message = str.split("=")[1];
      console.log("Received message:", message);

      // Optionally redirect back to home page
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  } 
  
  else {
    res.statusCode = 404;
    res.write("<h1>404 - Page Not Found</h1>");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});