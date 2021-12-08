const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const adminsRouter = require("./routes/Admins");
app.use("/auth", adminsRouter);
const clubsRouter = require("./routes/Clubs");
app.use("/clubs", clubsRouter);
const playersRouter = require("./routes/Players");
app.use("/players", playersRouter);
const gamesRouter = require("./routes/Games");
app.use("/games", gamesRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
