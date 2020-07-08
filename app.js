// Basic Required Modules
const express = require("express");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const images = require("./routes/api/images");
const seed = require("./routes/api/seed");
const fileUpload = require("express-fileupload");

// App Setup
const app = express();
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch(err => console.log(err));

// App Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(fileUpload());
require("./config/passport")(passport);

// Routes
app.get("/", (req, res) => res.send("Hello World"));

const users = require("./routes/api/users");
app.use("/api/users", users);

const sellers = require("./routes/api/sellers");
app.use("/api/sellers", sellers);

const releases = require("./routes/api/releases");
app.use("/api/releases", releases);

const tracks = require("./routes/api/tracks");
app.use("/api/tracks", tracks);

const products = require("./routes/api/products");
app.use("/api/products", products);

const personnel = require("./routes/api/personnel");
app.use("/api/personnel", personnel);

const comments = require("./routes/api/comments");
app.use("/api/comments", comments);

const reviews = require("./routes/api/reviews");
app.use("/api/reviews", reviews);

app.use("/api/images", images);
app.use("/api/seed", seed);

app.use((err, req, res, next) => {
  if (err) {
    if (err.error && err.error.isJoi) {
      console.log(err.type);
      res.status(400).json({
        name: err.error.name,
        message: err.error.message,
      });
    } else {
      res.status(400).json({ name: err.name, message: err.message });
    }
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
