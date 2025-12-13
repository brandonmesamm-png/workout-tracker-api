// Array de usuarios predefinidos
let users = [
  { id: 1, name: "Juan", email: "juan@example.com" },
  { id: 2, name: "María", email: "maria@example.com" },
  { id: 3, name: "Carlos", email: "carlos@example.com" }
];

// Helper para crear y almacenar un usuario
const createUserRecord = (name, email) => {
  const id = users.length ? users[users.length - 1].id + 1 : 1;
  const newUser = { id, name, email };
  users.push(newUser);
  return newUser;
};

export const getUsers = (req, res) => {
  console.log("GET /users recibido");
  res.json(users);
};

export const addUserFromGet = (req, res) => {
  // Lee los datos desde query params: /users/add?name=Nombre&email=email@ejemplo.com
  const { name, email } = req.query;
  if (!name || !email) {
    return res.status(400).json({ message: "Nombre y email deben ir en los query params" });
  }
  const newUser = createUserRecord(name, email);
  res.status(201).json(newUser);
};

export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
};

export const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Nombre y email son requeridos" });
  }
  const newUser = createUserRecord(name, email);
  res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: "Usuario no encontrado" });

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Nombre y email son requeridos" });
  }

  users[index] = { id, name, email };
  res.json(users[index]);
};

export const updateUserPartial = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  Object.assign(user, req.body);
  res.json(user);
};

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.status(204).send();
};
