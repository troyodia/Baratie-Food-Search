import { http, HttpResponse } from "msw";
import {
  LOGIN_URL,
  GET_AUTH_USER_URL,
  REFRESH_URL,
  BASE_URL,
} from "../../src/apis/URLS";
import { db } from "./db";
import { faker } from "@faker-js/faker";

export const getTestUserId = faker.string.uuid;

export const handlers = [
  http.post(LOGIN_URL, () => {
    const user = db.user.getAll();
    return HttpResponse.json({ user: user[0], token: faker.string.uuid });
  }),
  http.get(BASE_URL + GET_AUTH_USER_URL, () => {
    const user = db.user.getAll();
    return HttpResponse.json({ user: user[0] });
  }),
  http.get(REFRESH_URL, () => {
    return HttpResponse.json({ token: faker.string.uuid });
  }),
];
