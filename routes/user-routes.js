import express from "express"
import user_controller from "../controllers/user_controller.js"
import admin from "../middleware/admin.js"
import auth from "../middleware/auth.js"
const router=express.Router()
router.get("/users",auth,user_controller.getallUsers)
router.post("/register",user_controller.signup)
router.post("/login",user_controller.login)
router.put("/updateuser/:id",[auth,admin],user_controller.updateUser)
router.delete("/delete/:id",[auth,admin],user_controller.deleteUser)
export default router