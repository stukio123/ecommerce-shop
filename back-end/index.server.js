//Define app
const express = require("express");
const env = require("dotenv").config();
require("./models/db");
const userRoute = require("./routes/auth");
const adminRoute = require("./routes/admin/auth");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initalData");
const cors = require("cors");
const logger = require("morgan");
const app = express();

//Set public static folder
app.use(express.static(__dirname + "/build"));
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//Set View Engine
const expressHbs = require("express-handlebars");
const { initialData } = require("./controllers/admin/initalData");
const hbs = expressHbs.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

//Define route
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use("/api", userRoute);
app.use("/api", adminRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use("/api", initialDataRoutes);

app.get("/:page", (req, res, next) => {
  let page = req.params.page;
  res.render(page);
});

//Set Server port & Start port
app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  console.log(`Server is running on Port: ${app.get("port")}`);
});
