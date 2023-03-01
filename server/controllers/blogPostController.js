import {Post} from '../models/Blog.js';

export const AddBlog = (req, res)=>{
   const post = req.body;
  
    const createPost = new Post({
        creator: post.creator,
        title: post.title,
        image_link: post.image_link,
        content: post.content,
        category: post.categories,
        storage_ref: post.imageRefInFirebase
    })

    createPost.save(error=>{
        return error ? res.json({'message': 'Post fails'}):res.json({'message': 'post submitted successfully'})
    })   

}


export const GetPostsCreatedByPagination = async (req, res)=>{
    try{
        const page = parseInt(req.query.page);

        const limit = 3;
        const skip = (page - 1) * limit;
        //fetch post counts
        // const counts = await Post.countDocuments();
        // const postCounts = await counts;
        //fetch post by pagiantion
        const paginatePosts = await Post.find({}, null , {skip:skip, limit:limit});
        const finalpaginatePost = await paginatePosts;
        return res.json(finalpaginatePost);
        }catch(e){
        res.json(e.message);
    }
}

export const editBlogPost = async (req, res)=>{
    const id = req.params.id;
    const {storage_ref, firebaseImage_link, title, category, blogPost} = req.body;
    // console.log(title, category, post, creator, image_link)

    try{
        const post = await Post.updateOne( {_id:id}, 
           {
              $set:{
                // 'creator':creator,
                'storage_ref':storage_ref,
                'title':title,
                'image_link':firebaseImage_link,
                'content':blogPost,
                'category':category
            
              }
             }
     );
        res.status(200).json({message:'success'});
       
    }catch(error){
        res.status(400).json({'error':error.message})
        console.log('sorry')
    }
}
 
export const allPost = (req, res)=>{
    res.json('all post');
}

//fetch category  column from post
export const allCategoriesPost = async (req, res)=>{
    try{
        const limit = req.query.id;
        const Blog = await Post.find().limit(limit);
        res.send(Blog);
        
    }catch(error){
        res.send(error.message);
    }

}


//query db by category || empty query
export const allPostByCategories = async (req, res)=>{
    try {
        // if there is query
        const param = req.query.query;
        if(param){
            const limit = 5;
            const posts =  await Post.find( {"category":param}, null).limit(limit);
            res.send(posts);
        }else{
            const limit = 5;
            const posts =  await Post.find().limit(limit);
            res.send(posts);
        }
        
    } catch (error) {
        res.send(error.message);
    }
}

//query db by post id
export const PostById = async (req, res)=>{
    try {
        const id = req.query.query;
        if(id){
            const post =  await Post.find( {"_id":id}, null);
            res.send(post);
        }
        
    } catch (error) {
        res.send(error.message);
    }
}

export async function getAllPostsOfCurrentAuthUser(req, res){
    try {
        const user = req.headers.currentuser;
        // console.log(user)
        const skip = parseInt(req.query.query)* 5;
        // console.log(skip)
        const getUserPost = await Post.find({creator:user}, null, {skip, limit:5});
         res.status(200).json({'data':getUserPost})
        // console.log(getUserPost)
        res.end() 
    } catch (error) {
        res.status(500).json({'error':error.message})
    }
    
}


export async function deleteBlogPost(req, res){
    const {id} = req.params;
  
    try{
    const blogPost = await Post.deleteOne({_id:id});
    if(blogPost.acknowledged === true){
        // console.log(blogPost)
        res.status(200).send('success');
    }
    }catch(err){
        res.status(400).json({error:true});
    }

}


