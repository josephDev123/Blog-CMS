import { profileModel } from "../models/Profile.js";

export const role_users_get = async (req, res)=>{
    try {
        const page =  parseInt(req.query.page);
        const limit = 5;
        const skip = (page - 1) * limit;
       const profile = await profileModel.find({}, null, {skip,limit})
       const profileResult = profile;
       res.json(profileResult);
    } catch (error) {
        res.json(error.message);
    }

};

  export async function changeUserPermission(req, res){
    try{
      const queryId = req.query.ID;
    //   console.log(queryId);
      const Doc= await profileModel.findById(queryId);
      // console.log(Doc)
      Doc.role.admin = !Doc.role.admin;
      await Doc.save();
      res.json('success');
    }catch(errors){
     res.json(errors.message);
    }
   
}