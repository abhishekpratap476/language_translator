const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const trance = require("./route/translatecurd");
const crud = require("./route/curd");
dotenv.config();
const cors = require("cors");
app.use(cors());

app.use(express.json());

mongoose
.connect(process.env.URI)
.then(()=>{
    console.log("connected succesfully");
    app.listen(process.env.PORT || 8000, (err) => {
        if (err) 
            console.log(err);
            console.log('running Successfully at ${process.env.PORT}');
        
    });
})
.catch((error) => console.log("failed to connect",error));
app.use(crud);
app.use(trance);
