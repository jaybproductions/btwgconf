const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
const PORT = 89;

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "server is online" });
});

app.listen(PORT, () => {
  console.log("server is line at port", PORT);
});
