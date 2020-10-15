const { lagHtml } = require("./brev-generering");
const express = require("express");

const port = 8000;
const app = express();

app.get("/", (req, res) => {
  lagHtml().then(mal => {
    res.writeHead(200, { "Content-Type": "json/html; charset=utf-8" });
    res.write(JSON.stringify(mal));
    res.end();
  });
});

app.listen(port, "localhost", function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("server startet på http://localhost:%s/", port);
});
