import mongoose from 'mongoose';


const SettingBannerSchema = new mongoose.Schema({
    'creator':String,
    'banner_image_link':String,
    'banner_content':{
        type:String,
        maxLength:50,
        required:true
    },
    'title':{
        type:String,
        maxlength:50,
        required:true
    }

}, { timestamps: true })

export const CmsSettingModel = mongoose.model('setting', SettingBannerSchema);