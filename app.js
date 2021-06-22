require("dotenv").config();
const express = require("express");
const monggose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI_SECRET;

monggose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(port, () =>
      console.log(`Login-server listening on http://localhost:${port}/`)
    )
  )
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("This Server Use For Login Page Project ");
});
app.use(authRoutes);
