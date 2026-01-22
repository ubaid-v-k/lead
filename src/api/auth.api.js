//  localStorage 

const USERS_KEY = "crm_users";

export const registerUser = async (payload) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const email = payload.email.toLowerCase().trim();

  if (users.find(u => u.email === email)) {
    return { success: false, message: "EMAIL_EXISTS" };
  }

  users.push({
    email,
    password: payload.password,
    firstName: payload.firstName,
    lastName: payload.lastName,
  });

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
};

export const loginUser = async (payload) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const user = users.find(
    u =>
      u.email === payload.email.toLowerCase().trim() &&
      u.password === payload.password.trim()
  );

  if (!user) return { success: false };

  localStorage.setItem("crm_token", "FAKE_JWT_TOKEN");
  return { success: true, user };
};

export const logout = () => {
  localStorage.removeItem("crm_token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("crm_token");
};
