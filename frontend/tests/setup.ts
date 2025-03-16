import "@testing-library/jest-dom/vitest";
import "vitest-canvas-mock";
import { afterAll, beforeAll, vi } from "vitest";
import { server } from "./mocks/server";
import { afterEach } from "node:test";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url);
});

vi.mock("@react-oauth/google");
