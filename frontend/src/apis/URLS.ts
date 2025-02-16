export const BASE_URL = "http://localhost:5000";

//auth

export const SIGN_UP_URL = `${BASE_URL}/api/v1/auth/sign-up-user`;
export const LOGIN_URL = `${BASE_URL}/api/v1/auth/login-user`;
export const REFRESH_URL = `${BASE_URL}/api/v1/auth/refresh-access-token`;
export const GET_AUTH_USER_URL = `/api/v1/auth/authorized-user-info`;
