import { profileModel } from "../models/Profile.js";


// handle profile posting
export const profile_post =  async (req, res)=>{
        try {
              const { isAuthUser, names,title,about,phone,surname} = req.body;

              const uploadedProfile= await new profileModel({
              postedBy:isAuthUser,
              name:names,
              title:title,
              about:about,
              phone:phone,
              surname:surname,
              role:{user:'user', admin:''}
        })
              // save document
              const result = await uploadedProfile.save();
             res.json({'success':true})  
                 
        } catch (error) {
            res.json({'error':true})   
           console.log(error.message)
        }
        
}

// handles edit profile
export const profile_edit = async (req, res)=>{
        try {
                const {names,title, about,phone,surname, profile} = req.body;
                const id = req.params.id;
      
               const profileReq =  await profileModel.findByIdAndUpdate(id, {
                name:names?names:profile.name,
                 title:title?title:profile.title, 
                 about:about?about:profile.about, 
                 phone:phone?phone:profile.phone, 
                 surname:surname?surname:profile.surname})
                 res.json({success:'profile updated'}) 
        } catch (error) {
               res.json({error:err}) 
        }
        // const {names,title, about,phone,surname, profile} = req.body;
        // const id = req.params.id;
      
        // profileModel.findByIdAndUpdate(id, {
        //         name:names?names:profile.name,
        //          title:title?title:profile.title, 
        //          about:about?about:profile.about, 
        //          phone:phone?phone:profile.phone, 
        //          surname:surname?surname:profile.surname},
                 
        //           (err, result)=>{
        //         if(err) res.json({error:err});
        //         res.json({success:'profile updated'});

        // })
       
       
}


//handles how to fetch all the users profile/ data/ information
export const getProfileUsers = async (req, res)=>{
        try {
                const page = parseInt(req.query.page);
                const limit = 5;
                const skip = (page - 1) * limit;
        
                const userProfiles = await profileModel.find({}, null,  {skip, limit}); 
                const userProfilesResult = await userProfiles
                res.json(userProfilesResult);
            } catch (error) {
                res.json(error.message);
        }
      
}

// handle fetching user's profile
export const handleUserProfile = async (req, res)=>{
       
        try {
           const query = req.params.user; 
            const profile = await profileModel.find({'postedBy':query});
            const result = await profile;
            res.json(result)
        } catch (error) {
            res.json(error.message);    
        }
}

//handle the number of doc is in the profile collection
export const handleProfileCount =(req, res)=>{
        profileModel.countDocuments({}, (error, count)=>{
                if(error) {
                 console.log(error);
                res.json({'error':true})
                }else{
                 res.json({'count':count});
                }
          
        })
}