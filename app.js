require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

//Require routes
const unitAPI = require("./routes/unit");
const classAPI = require("./routes/class");
const userAPI = require("./routes/user");
const topicAPI = require("./routes/topic");
const insigniaAPI = require("./routes/insignia");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({
    status: "success",
  });
});
app.use("/api/users", userAPI);
app.use("/api/topics",topicAPI);
app.use("/api/units", unitAPI);
app.use("/api/classes", classAPI);
app.use("/api/insigniaes", insigniaAPI);

//Kết nối mongodb
const mongoUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.i3iqx2l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Kiểm tra kết nối
mongoose.connection.on("connected", () => {
  console.log("Yehhh, congratulation! Connected with Mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("Has an error when connect with Mongo", err);
});

app.listen(port, () => {
  console.log(
    `server is running example is listening at http://localhost:${port}`
  );
});
