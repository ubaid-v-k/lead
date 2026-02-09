const USERS_KEY = "crm_users";
const SESSION_KEY = "crm_logged_user";

// Helper to get all users
const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

// Helper to save users
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Register a new user
export const registerUser = (data) => {
  const users = getUsers();
  const email = data.email.trim().toLowerCase();

  if (users.find((u) => u.email === email)) {
    return { success: false, message: "Email already registered" };
  }

  const newUser = {
    ...data,
    email,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true };
};

// Login user
export const loginUser = ({ email, password }) => {
  const users = getUsers();
  const cleanEmail = email.trim().toLowerCase();

  // In a real app, you should hash passwords. Here we just compare strings.
  const user = users.find(
    (u) => u.email === cleanEmail && u.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid email or password" };
  }

  const { password: _, ...userWithoutPassword } = user; // Exclude password from session
  localStorage.setItem(SESSION_KEY, JSON.stringify(userWithoutPassword));
  return { success: true, user: userWithoutPassword };
};

// Logout user
export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};

// Get current logged in user
export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
};

// Check if authenticated
export const isAuthenticated = () => {
  return !!getCurrentUser();
};
