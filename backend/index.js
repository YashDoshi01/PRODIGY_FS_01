const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
// const cors = require("cors");
const AuthRouter = require("./routes/authRoute");


require("dotenv").config();
require("./models/db");


const app = express();
const PORT  = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());


app.use('/auth' , AuthRouter)


app.listen(PORT , () => {
    console.log(`port started on ${PORT}`);
})