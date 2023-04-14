const express = require('express');
const app = express();
const mongoose = require('mongoose')
const { mongoUrl } = require('./keys.js')
require('./models/model')
const PORT = 5001;
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(require("./routes/auth"))

//way1
mongoose.connect(mongoUrl)

mongoose.connection.on("connected",()=>{
    console.log("Successfully connected to mongo");
})
mongoose.connection.on("error",()=>{
    console.log("not connected to mongo");
})


//way2
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connection.on("connect",()=>{
//     console.log("Successfully connected to MongoDB database!");
// });
// mongoose.connection.on("error", (err) => {
//     console.log("Error connecting to MongoDB database:", err);
// });


//way3
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Database connected!");
//   })
//   .catch((err) => {
//     console.log("Error connecting to database:", err);
//   });

app.listen(PORT, ()=>{
    console.log('Server listening on '+PORT);
})