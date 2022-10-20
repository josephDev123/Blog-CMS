import express  from "express";
import { profile_post, handleProfileCount, handleUserProfile, profile_edit, getProfileUsers} from "../controllers/profileController.js";

export const profileRouter = express.Router();

profileRouter.post('/upload-profile', profile_post);
profileRouter.post('/edit-profile/:id', profile_edit);
profileRouter.get('/get-user-profile/:user', handleUserProfile);
profileRouter.get('/profile-count', handleProfileCount);
profileRouter.get('/users', getProfileUsers);
