import { Router } from "express";
import {
  getUsers, getUserById, createUser, addUserFromGet,
  updateUser, updateUserPartial, deleteUser
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/add", addUserFromGet);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.patch("/:id", updateUserPartial);
router.delete("/:id", deleteUser);

export default router;
