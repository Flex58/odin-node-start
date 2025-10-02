const express = require("express");
const app = express();

const port = 8080;

app.get("/{*splat}", (req, res) => {
  const path = req.path;
  const file =
    path === "/"
      ? __dirname + "/index.html"
      : __dirname + path + ".html";
  res.set("Content-Type", "text/html");
  res.sendFile(file, (err) => {
    if (err) {
      res.status(404);
      res.sendFile(__dirname + "/404.html", (newErr) => {
        if (newErr) {
          throw newErr;
        }
      });
      return;
    }
    res.status(200);
  });
});

app.listen(port, () => console.log(`Server listion to Port ${port}`));
