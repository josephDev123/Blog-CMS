import express from "express";
import cors from "cors";
import dotevn from 'dotenv';
import mongoose from 'mongoose';

dotevn.config();

//blog module
import blogPostRouter from './routes/blogPostRouter.js';
import {roleRouter} from './routes/roleRouter.js';
import {permissionRouter} from './routes/permissionRouter.js'

//profile module
import {profileRouter} from './routes/profileRoute.js';

//setting router
import {cmsSettingRouter} from './routes/SettingRouter.js'

const URL= process.env.MONGO_ATLAS_URL;
 
  
mongoose.connect(URL, {useNewUrlParser: true,  useUnifiedTopology: true}, (err)=>{
  console.log(err)
})

mongoose.connection.on("error", function(error) {
  console.log('error after initial connection')
})

mongoose.connection.on("connected", function(err, res) {
  console.log("Connected to MongoDB database after initial connection.")
})

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());


// mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true})
//   .then((result) =>{
//     console.log("Connected to MongoDB database.");
//     app.listen(PORT, ()=>{
//       console.log(`server running on port ${PORT}`)
//     })
//   })
//   .catch((err) => console.log(err));

//blog routes
app.use('/blog', blogPostRouter);

app.use('/role', roleRouter);

app.use('/permission', permissionRouter);

//profile route
app.use('/profile', profileRouter);

//setting route
app.use('/setting', cmsSettingRouter);

//any routes that does not exist
app.all('*', (req, res)=>{
    res.status(500).json({'message':'this url is not on our routes'}) 
    // res.end();
});

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})
