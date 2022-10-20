import express from 'express'


export const permissionRouter = express.Router();

permissionRouter.get('/', (req, res)=>{
    res.json('permission')
})