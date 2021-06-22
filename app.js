const express = require("express");
const monggose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());

const dbURI =
  "mongodb://dannygg:ggwp123@nodeapp-shard-00-00.la8gg.mongodb.net:27017,nodeapp-shard-00-01.la8gg.mongodb.net:27017,nodeapp-shard-00-02.la8gg.mongodb.net:27017/node-auth?ssl=true&replicaSet=atlas-sdo70z-shard-0&authSource=admin&retryWrites=true&w=majority";

monggose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("This Server Use For Login Page Project ");
});
app.use(authRoutes);
