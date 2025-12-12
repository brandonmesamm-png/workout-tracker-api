import { Router } from "express";
import {
  getWorkouts, getWorkoutById, createWorkout,
  updateWorkout, updateWorkoutPartial, deleteWorkout
} from "../controllers/workouts.controller.js";

const router = Router();
router.get("/", getWorkouts);
router.get("/:id", getWorkoutById);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.patch("/:id", updateWorkoutPartial);
router.delete("/:id", deleteWorkout);
export default router;