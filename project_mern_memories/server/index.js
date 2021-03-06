
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
dotenv.config({path:'./config.env'});

app.use('/posts', postRoutes);


const PORT = process.env.PORT|| 5000;

if(process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"));
  const path=require("path");
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

//mongoose.set('useFindAndModify', false);