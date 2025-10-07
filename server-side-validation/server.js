const http = require("http");

const server = http.createServer((req, res) => {

  if (req.url === "/") {
    res.write("<html>");
    res.write("<body style='font-family:Arial; text-align:center; margin-top:50px;'>");
    res.write("<h1 style='color:blue;'>Server-Side Form with Validation</h1>");
    res.write("<form action='/message' method='POST'>");
    res.write("<input type='text' name='msg' placeholder='Enter your message' style='padding:5px; width:200px;' required>");
    res.write("<button type='submit' style='padding:5px 10px; margin-left:10px;'>Submit</button>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } 

  else if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", chunk => body.push(chunk));

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      // Server-side validation: check if message is empty or too long
      if (!message || message.trim() === "") {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.write("<h1 style='color:red; text-align:center;'>Error: Message cannot be empty!</h1>");
        res.write("<a href='/' style='text-align:center; display:block;'>Go Back</a>");
        res.end();
        return;
      }

      if (message.length > 50) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.write("<h1 style='color:red; text-align:center;'>Error: Message too long (max 50 chars)!</h1>");
        res.write("<a href='/' style='text-align:center; display:block;'>Go Back</a>");
        res.end();
        return;
      }

      // If valid, show success
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<h2 style='color:green; text-align:center;'>Message Received: ${message}</h2>`);
      res.write("<a href='/' style='text-align:center; display:block;'>Go Back</a>");
      res.end();
    });
  } 

  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1 style='color:red; text-align:center;'>404 - Page Not Found</h1>");
    res.end();
  }

});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
