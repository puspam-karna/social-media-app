const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
});

const app = express();
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/posts.js");
const multer = require("multer");
const path = require("path");
//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    //cb(null, file.originalname);
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("file has been uploaded");
  } catch (error) {
    console.log(error);
  }
});
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("server is running");
});
