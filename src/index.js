import express from 'express';
import usersRouter from './routes/users.routes.js'; // Asegúrate de que la ruta sea correcta

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de usuarios
app.use("/users", usersRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
const workoutsRoutesPath = "./routes/workouts.routes.js";
const exercisesRoutesPath = "./routes/exercises.routes.js";

(async () => {
  try {
    const workouts = await import(workoutsRoutesPath);
    app.use("/workouts", workouts.default);
  } catch (err) {
    console.warn("Ruta /workouts no cargada (archivo ausente)");
  }

  try {
    const exercises = await import(exercisesRoutesPath);
    app.use("/exercises", exercises.default);
  } catch (err) {
    console.warn("Ruta /exercises no cargada (archivo ausente)");
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
})();
