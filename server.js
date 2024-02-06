const express = require('express');
const cors = require("cors");

const app = express();

const PORT = 3000;

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/jsonfile.routes")(app);

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
  } else {
    console.log("Error occurred, server can't start ", err);
  }
});