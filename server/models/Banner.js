import mongoose from 'mongoose';


const BannerSchema = new mongoose.Schema({
    'banner_image_link':String,
    'banner_content':{
        type:String,
        maxLength:50,
        required:true
    }

}, { timestamps: true })

export const BannerModel = mongoose.model('Banner', BannerSchema);