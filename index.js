import express from "express"
import bodyParser from "body-parser";
import dataBase from "./config/db.js";
import users from "./routes/user-routes.js"
const app=express()

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// dataBase connection
dataBase()
// routes
app.use('/api',users)

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));