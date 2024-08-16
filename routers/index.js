import { Router } from "express";
import adminRouter from "./adminRouter.js";


const router = Router()

router.use(adminRouter)


export default router;