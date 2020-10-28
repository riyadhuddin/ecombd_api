const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000
mongoose.connect(
    "mongodb+srv://flutter1:<pass>@flutter.m3luf.gcp.mongodb.net/<db>?retryWrites=true&w=majority",
    {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb connected");
});
//middle ware
app.use(express.json());
const userRoute = require("./routes/user");
app.use("/user", userRoute);

const profileRoute = require("./routes/profile");
app.use("/profile", profileRoute);

app.route("/").get((req, res) => res.json("my first rest api ok"));
app.listen(port, () => console.log(`node server started at http://localhost:${port}`));