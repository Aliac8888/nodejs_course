const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>NodeJS Server - Home</title></head>");
    res.write("<body><h1>Home Page</h1></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/add-task" && method === "GET") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>NodeJS Server - Add Task</title></head>");
    res.write(
      "<body><form action='/add-task' method='POST'><input type='text' name='title'><button type='submit'>Add</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/add-task" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const title = parsedBody.split("=")[1];

      fs.writeFile("title.txt", title, (err) => {
        if (err) {
          console.log(err);

          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        }

        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
});

server.listen(3000);
