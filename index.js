var mongoDB = 'mongodb://127.0.0.1:27017/gamestore';
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
const mongoose = require("mongoose");

mongoose.connect(mongoDB)
    .then(function () { console.log("database connected") })
    .catch((function (error) { console.log(error); }));

const usersRouter = require("./Routes/user.route");
app.use("/users", usersRouter)

app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
})