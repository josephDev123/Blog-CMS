import express from "express";
export const cmsSettingRouter = express.Router();
import {cmsBannerAndContentPostMethod, cmsBannerAndContentGetMethod} from '../controllers/cmsSettingController.js';

cmsSettingRouter.post('/change-banner-content', cmsBannerAndContentPostMethod);
cmsSettingRouter.get('/change-banner-content', cmsBannerAndContentGetMethod);

