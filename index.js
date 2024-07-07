const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const undianRoute = require("./routes/undianRoute");
app.set("view engine", "ejs");
//const bootstrap = require('bootstrap')
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const appUrl = process.env.APP_URL;

app.use("/static", express.static(path.join(__dirname, "public")));
//app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));

app.use("/", userRoute);
app.use("/", undianRoute);

app.get("/", (req, res) => {
  res.render("login", { app_url: appUrl });
});

// app.get('/main', (req, res) => {
//   res.render('main');
// })
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
