require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const db = require("./models");
const syncdb = false;


app.use(cors());
app.use(helmet());
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

require("./routes/index")(app);

// cors
const allowlist = ["http://localhost:3000", "http://localhost:3001"];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
app.use(cors(corsOptionsDelegate));


app.listen(process.env.ENPOINT_PORT, () => {
  console.log(
    `server listening on http://localhost:${process.env.ENPOINT_PORT}`
  );
  db.sequelize
    .sync({ force: syncdb })
    .then(() => console.log("> Connected to database\n"))
    .catch((err) => {
      console.log("> Something went wrong!", err.message);
      process.exit(1);
    });
});
