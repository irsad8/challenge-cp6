const express = require('express');
const cors = require('cors');
const session = require('express-session')
const dotenv = require('dotenv');
const db = require('./config/database');
const SequelizeStore = require('connect-session-sequelize');
const userRoute = require('./routers/UserRoute');
const carRoute = require('./routers/CarRoute');
const authRouter = require('./routers/AuthRoute');

dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
});
// (async()=>{
//     await db.sync({alter:true});
// })();
app.use(session({
    secret: process.env.SESS_SECREAT,
    resave:false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));
app.use(cors({
    credentials: true
}));
app.use(express.json());
app.use(userRoute);
app.use(carRoute);
app.use(authRouter);

// store.sync();

app.listen(process.env.PORT, ()=>{
    console.log(`server anda berjalan pada port ${process.env.PORT}`)
})