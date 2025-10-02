import http from "node:http";
import fs from "node:fs";
import url from "node:url";

const host = "localhost";
const port = 8080;

const server = http.createServer((req, res) => {
  const parseUrl = url.parse(req.url, true);
  const file =
    parseUrl.path === "/" ? "./index.html" : "." + parseUrl.path + ".html";

  fs.readFile(file, (err, data) => {
    if (err) {
      fs.readFile("./404.html", (err, errData) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write("404 Page Not Found");
          return res.end();
        }
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.write(errData);
        return res.end();
      });
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    return res.end();
  });
});

server.listen(port, host, () =>
  console.log(`Server running at ${host}${port}`)
);
