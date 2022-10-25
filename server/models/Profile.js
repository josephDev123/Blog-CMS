import mongoose from "mongoose";
// import { Schema } from "mongoose";

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

const profileSchema = new mongoose.Schema({
    postedBy:{
        type:String,
        validate: [validateEmail, "Please fill a valid email address"],
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address", ],
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
    },
    profile_img:{
        type:String,
        required:false
    },
    name:{
        type:String,
        required:false,
        maxlength:30
    },
    title:{
        type:String,
        required:false,
        maxlength:30
    },

    about:{
        type:String,
        required:false,
        maxlength:100
    },

    phone:{
        type:Number,
        required:false
    },

    surname:{
        type:String,
        required:false
    }, 
    
    role: {
        user:String, 
        admin:{
            type:Boolean,
            default:false
        }
    }
})

export const profileModel = mongoose.model('profile', profileSchema);
