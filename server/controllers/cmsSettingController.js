import {CmsSettingModel} from '../models/BannerSetting.js'


//handle the deploy of banner image, title and it write-up that will be in the banner on the landing page
export const cmsBannerAndContentPostMethod = async (req, res)=>{
        const {bannerSlug, bannerContent, title} = req.body;
       
      try {
        const updateBanner_content =  await CmsSettingModel.updateOne({}, {$set:{banner_image_link:bannerSlug, banner_content:bannerContent, title:title}}, {upsert:true})
      res.status(200).json({message:'success'})
      } catch (error) {
         console.error(error.message);
      }
}



export const cmsBannerAndContentGetMethod = async (req, res)=>{
  try {
    const banner_data =  await CmsSettingModel.find();
    // console.log(banner_data)
    res.status(200).json({message:banner_data})
  } catch (error) {
    res.status(400).send(error.message);
  }

}