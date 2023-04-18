import express, { Router } from 'express';
import {role_users_get, changeUserPermission} from '../controllers/roleController.js';

export const roleRouter = express.Router();

roleRouter.get('/users', role_users_get);
roleRouter.post('/users-permission', changeUserPermission);
roleRouter.post('/user', changeUserPermission);