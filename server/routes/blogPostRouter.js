import express from 'express';
import {AddBlog, editBlogPost, allPost, allPostByCategories, allCategoriesPost, GetPostsCreatedByPagination, PostById, getAllPostsOfCurrentAuthUser, deleteBlogPost} from '../controllers/blogPostController.js';


const blogPostRouter = express.Router();

blogPostRouter.post('/create-post', AddBlog);
blogPostRouter.get('/all-post-pagination', GetPostsCreatedByPagination);
blogPostRouter.put('/edit/:id', editBlogPost);
blogPostRouter.get('/all-post', allPost);
blogPostRouter.get('/all-post/categories', allCategoriesPost);
blogPostRouter.get('/post/bycategories', allPostByCategories);
blogPostRouter.get('/post/byId', PostById);
blogPostRouter.get('/post/currentUser', getAllPostsOfCurrentAuthUser);
blogPostRouter.delete('/post/:id', deleteBlogPost);

export default blogPostRouter;