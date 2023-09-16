const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Allow requests from any origin (not recommended for production)

  if (req.url === "/api/data" && req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      // Set up an error handler for the response object
      res.on("error", (error) => {
        console.error("Error sending response:", error);
        return;
      });

      // Send a response back to the client side
      res.writeHead(200, { "Content-Type": "text/plain" }); // 200 is the HTTP status code
      res.end("Hello " + data);
    });
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
