// src/utils/auth.js

// Set the token in local storage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Get the token from local storage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Remove the token from local storage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  
  // Optionally, you might want to check if the token is expired
  // For simplicity, assuming that the token's presence means authentication
  return !!token;
};

// Optionally, check if the token is expired (requires decoding the token)
export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode token payload
    return decoded.exp * 1000 < Date.now(); // Check if the token has expired
  } catch (e) {
    console.error('Token decoding failed', e);
    return true;
  }
};
