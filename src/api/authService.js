const USERS_KEY = "crm_users";

const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const registerUser = (data) => {
  const users = getUsers();

  const email = data.email.trim().toLowerCase();
  const password = data.password.trim();

  if (users.find((u) => u.email === email)) {
    return { success: false, message: "Email already registered" };
  }

  const user = {
    email,
    password,
    firstName: data.firstName,
    lastName: data.lastName,
  };

  users.push(user);
  saveUsers(users);

  return { success: true };
};

export const loginUser = ({ email, password }) => {
  const users = getUsers();

  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  const user = users.find(
    (u) => u.email === cleanEmail && u.password === cleanPassword
  );

  if (!user) {
    return { success: false };
  }

  localStorage.setItem("crm_logged_user", JSON.stringify(user));
  return { success: true };
};


