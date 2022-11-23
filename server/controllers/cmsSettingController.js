import {CmsSettingModel} from '../models/CmsSetting.js'


//handle the deploy of banner image and it write-up that will be in the banner on the landing page
export const cmsBannerAndContentPostMethod = async (req, res)=>{
        const {bannerSlug, bannerContent} = req.body;
      try {
        const updateBanner_content =  await CmsSettingModel.updateOne({}, {$set:{banner_image_link:bannerSlug, banner_content:bannerContent}}, {upsert:true}  )
        res.send('updating ...')
      } catch (error) {
         console.error(error.message)
      }
}



export const cmsBannerAndContentGetMethod = async (req, res)=>{
  res.send('getting...')
}