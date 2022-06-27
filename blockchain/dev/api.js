import express from "express";

const app = express();

app.get("/blockchain", (req, res) => {
  res.send("Blockchain");
});
app.get("/transaction", (req, res) => {});

app.get("/mine", (req, res) => {});
app.listen(3000, () => console.log(" app listening on port 3000."));
