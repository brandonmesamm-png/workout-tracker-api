import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Workout Tracker API funcionando" });
});

import usersRoutes from "./routes/users.routes.js";
import workoutsRoutes from "./routes/workouts.routes.js";
import exercisesRoutes from "./routes/exercises.routes.js";

app.use("/users", usersRoutes);
app.use("/workouts", workoutsRoutes);
app.use("/exercises", exercisesRoutes);

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});
