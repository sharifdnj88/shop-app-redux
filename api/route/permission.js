import express from "express";
import { createPermission, deletePermission, getAllPermission, getSinglePermission, updatePermission, updatePermissionStatus } from "../controllers/permissionController.js";
import tokenVerify from "../middlewares/verifyToken.js";

const router = express.Router();

// use verify token
router.use(tokenVerify);

// create route

router.route("/").get(getAllPermission).post(createPermission);
router.route("/:id").get(getSinglePermission).delete(deletePermission).put(updatePermission);
router.route("/status/:id").put(updatePermissionStatus);

// export default router
export default router;
