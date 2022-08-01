import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize"
import userroute from "./routes/userroute.js";
import proroute from "./routes/proroute.js";
import authroute from "./routes/authroute.js"
import db from "./config/db.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db: db
})

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.sess_secret,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5000'
}));
app.use(express.json());
app.use(userroute);
app.use(proroute);
app.use(authroute);


app.listen(process.env._port, ()=> {
    console.log('Server up and running...');
});

// store.sync()