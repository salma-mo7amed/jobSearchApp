// import modules:
import express from 'express';
import { connectDB } from './db/connection.js';
import authRouter from './src/modules/auth/auth.router.js';
import userRouter from './src/modules/user/user.router.js';
import jobRouter from './src/modules/job/job.router.js';
import companyRouter from './src/modules/company/company.router.js';
import applicationRouter from './src/modules/application/application.router.js';
import { globalError } from './src/utils/globalError.js';
// create server:
const app = express();
const port = 3000;
// app usage:
app.use(express.json());
// app routes:
app.use('/auth', authRouter);
app.use("/users", userRouter);
app.use("/jobs", jobRouter);
app.use("/companies", companyRouter);
app.use("/application", applicationRouter);
// db connection:
connectDB();




// global error handling:
app.use(globalError);
// listen on server:
app.listen(port, ()=>{
    console.log('server is running on port', port);
})
