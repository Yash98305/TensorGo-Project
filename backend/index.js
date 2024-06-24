const express = require("express");
const app = express();
const dotenv = require("dotenv");
const errorMiddleware = require("./middlewares/error.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRoute = require("./routes/authRoute.js");
const serviceRoute = require("./routes/serviceRoute.js");
const planRoute = require("./routes/planRoute.js");
const subscriptionRoute = require("./routes/subscriptionRoute.js");
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/subscription", subscriptionRoute);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/plan", planRoute);

app.get("/", (req, res) => {
  res.send({
    message: "welcome to TenserGo application",
  });
});

app.use(errorMiddleware);

module.exports = app;
