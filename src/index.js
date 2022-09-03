const express = require("express");
const app = express();
const router = require("./routes/route");
const bodyparser = require("body-parser");

app.use(bodyparser.json());

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://arijit8637:WTqiGxjIFMSg5nxn@cluster0.u6fy9.mongodb.net/project-H3-Mart?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log("express running on PORT:", process.env.PORT || 3000);
});
