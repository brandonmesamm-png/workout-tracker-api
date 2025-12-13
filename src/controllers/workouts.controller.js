// Simple in-memory store for rutinas (workouts)
let workouts = [
	{ id: 1, name: "Rutina full body", exercises: [1,2], notes: "3 días a la semana" }
];

const createWorkoutRecord = (name, exercises = [], notes = "") => {
	const id = workouts.length ? workouts[workouts.length - 1].id + 1 : 1;
	const newWorkout = { id, name, exercises, notes };
	workouts.push(newWorkout);
	return newWorkout;
};

export const getWorkouts = (req, res) => {
	res.json(workouts);
};

export const getWorkoutById = (req, res) => {
	const id = parseInt(req.params.id);
	const w = workouts.find(x => x.id === id);
	if (!w) return res.status(404).json({ message: "Rutina no encontrada" });
	res.json(w);
};

export const createWorkout = (req, res) => {
	const { name, exercises, notes } = req.body;
	if (!name) return res.status(400).json({ message: "`name` es requerido" });
	if (exercises && !Array.isArray(exercises)) return res.status(400).json({ message: "`exercises` debe ser un array de ids" });
	const newW = createWorkoutRecord(name, exercises || [], notes || "");
	res.status(201).json(newW);
};

export const updateWorkout = (req, res) => {
	const id = parseInt(req.params.id);
	const idx = workouts.findIndex(x => x.id === id);
	if (idx === -1) return res.status(404).json({ message: "Rutina no encontrada" });
	const { name, exercises, notes } = req.body;
	if (!name) return res.status(400).json({ message: "`name` es requerido" });
	if (exercises && !Array.isArray(exercises)) return res.status(400).json({ message: "`exercises` debe ser un array de ids" });
	workouts[idx] = { id, name, exercises: exercises || [], notes: notes || "" };
	res.json(workouts[idx]);
};

export const updateWorkoutPartial = (req, res) => {
	const id = parseInt(req.params.id);
	const w = workouts.find(x => x.id === id);
	if (!w) return res.status(404).json({ message: "Rutina no encontrada" });
	if (req.body.exercises && !Array.isArray(req.body.exercises)) return res.status(400).json({ message: "`exercises` debe ser un array de ids" });
	Object.assign(w, req.body);
	res.json(w);
};

export const deleteWorkout = (req, res) => {
	const id = parseInt(req.params.id);
	const before = workouts.length;
	workouts = workouts.filter(x => x.id !== id);
	if (workouts.length === before) return res.status(404).json({ message: "Rutina no encontrada" });
	res.status(204).send();
};