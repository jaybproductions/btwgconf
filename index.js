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

app.post("/voice", (request, response) => {
  const twiml = new VoiceResponse();
  twiml.say("Welcome to the conference system.", {
    voice: "alice",
  });
  twiml.redirect("/gather");
  response.send(twiml.toString());
});

app.post("/gather", (request, response) => {
  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    timeout: "10",
    finishOnKey: "#",
    action: "/join",
  });
  gather.say("Please enter your access code.", {
    voice: "alice",
  });
  twiml.redirect("/gather");
  response.send(twiml.toString());
});

app.post("/join", (request, response) => {
  const twiml = new VoiceResponse();
  const conference = conferences(request.body.Digits);
  if (conference) {
    twiml.say("You are now entering the conference.", {
      voice: "alice",
    });
    const dial = twiml.dial();
    dial.conference(conference);
  } else {
    twiml.say("The access code you entered is incorrect.", {
      voice: "alice",
    });
    twiml.redirect("/gather");
  }
  response.send(twiml.toString());
});

app.listen(PORT, () => {
  console.log("server is line at port", PORT);
});
