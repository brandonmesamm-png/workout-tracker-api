import { Router } from "express";
import {
  getExercises, getExerciseById, createExercise,
  updateExercise, updateExercisePartial, deleteExercise
} from "../controllers/exercises.controller.js";

const router = Router();
router.get("/", getExercises);
router.get("/:id", getExerciseById);
router.post("/", createExercise);
router.put("/:id", updateExercise);
router.patch("/:id", updateExercisePartial);
router.delete("/:id", deleteExercise);
export default router;