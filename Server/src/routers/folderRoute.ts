import express, { Router } from "express";
import { folderController } from "../controllers/folderController";

const router: Router= express.Router();

router.get("/folder-metadata/:folderId", folderController);


export default router;