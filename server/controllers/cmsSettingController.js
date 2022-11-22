import {CmsSettingModel} from '../models/CmsSetting.js'

export const cmsBannerAndContentPostMethod = async (req, res)=>{
        const {bannerSlug, bannerContent} = req.body;
      try {
        const updateBanner_content =  await CmsSettingModel.updateOne({}, {$set:{banner_image_link:bannerSlug, banner_content:bannerContent}}, {upsert:true}  )
        res.send('updating ...')
      } catch (error) {
         console.error(error.message)
      }
}