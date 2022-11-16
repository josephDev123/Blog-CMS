import express from "express";
export const cmsSettingRouter = express.Router();
import {cmsBannerAndContentPostMethod} from '../controllers/cmsSettingController.js';

cmsSettingRouter.post('/post', cmsBannerAndContentPostMethod);

