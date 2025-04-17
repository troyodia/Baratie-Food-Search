export const BASE_URL = "http://localhost:5000";

//auth

export const SIGN_UP_URL = `${BASE_URL}/api/v1/auth/sign-up-user`;
export const LOGIN_URL = `${BASE_URL}/api/v1/auth/login-user`;
export const REFRESH_URL = `${BASE_URL}/api/v1/auth/refresh-access-token`;
export const LOGOUT_URL = "/api/v1/auth/logout-user";
export const GET_AUTH_USER_URL = `/api/v1/auth/authorized-user-info`;
export const UPDATE_PROFILE = `/api/v1/auth/update-profile`;

//my resturant

export const CREATE_RESTURANT = "/api/v1/resturant/create-resturant";
export const GET_RESTURANT = "/api/v1/resturant/get-resturant";
//need restaurant id
export const GET_SEARCHED_RESTURANT = "/api/v1/resturant/";
export const UPDATE_RESTURANT = "/api/v1/resturant/update-resturant";

//search

export const SEARCH_FOR_RESTAURANT = "/api/v1/search-restaurant";
