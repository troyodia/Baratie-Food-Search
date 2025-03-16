import { screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { it, expect, describe, beforeAll, afterAll } from "vitest";
import LoginPage from "../../src/pages/LoginPage";
import SignUpPage from "../../src/pages/SignUpPage";
import HomePage from "../../src/pages/HomePage";
import React from "react";
import AllWrapers from "../AllWrapers";
import { renderWithRouter } from "../test-utils";
import { Route, Routes } from "react-router-dom";
import { db } from "../mocks/db";
import { server } from "../mocks/server";
import { LOGIN_URL } from "../../src/apis/URLS";
import { http, HttpResponse } from "msw";

describe("Login Page", () => {
  let userId: number;

  beforeAll(async () => {
    const user = db.user.create();
    userId = user.id;
  });
  afterAll(() => {
    db.user.delete({ where: { id: { equals: userId } } });
  });
  const renderForm = () => {
    renderWithRouter(
      <AllWrapers>
        <Routes>
          <Route path="/signup-page" element={<SignUpPage />}></Route>
          <Route path="/login-page" element={<LoginPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </AllWrapers>,
      { route: "/login-page" }
    );
    const submitForm = async (email: string, password: string) => {
      const user = userEvent.setup();

      await user.type(
        screen.getByRole("textbox", { name: /Password/i }),
        password
      );
      await user.type(
        screen.getByRole("textbox", { name: /email address/i }),
        email
      );
      await user.click(screen.getByRole("button", { name: /login/i }));
    };
    return {
      getInputs: () => {
        return {
          emailInput: screen.getByRole("textbox", { name: /email address/i }),
          passwordInput: screen.getByRole("textbox", { name: /Password/i }),
          googleButton: screen.getByRole("button", { name: /google/i }),
          loginButton: screen.getByRole("button", { name: /login/i }),
        };
      },
      submitForm,
    };
  };
  it("should render login form", () => {
    const { getInputs } = renderForm();
    const { emailInput, passwordInput, googleButton, loginButton } =
      getInputs();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(googleButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent(/login/i);
  });
  it("should not allow login button to be clicked if fields are empty", () => {
    const { getInputs } = renderForm();
    const { loginButton } = getInputs();
    expect(loginButton).toBeDisabled();
  });
  it.each([
    {
      scenario:
        "invalid email is entered and the login button should be disabled",
      errorMsg: /invalid email/i,
      email: "secret123",
    },
    {
      scenario:
        "invalid email is entered and then field is cleared and the login button should be disabled",
      errorMsg: /invalid email/i,
      email: "secret123",
    },
  ])(
    "should display an error if $scenario",
    async ({ email, errorMsg, scenario }) => {
      const { getInputs } = renderForm();
      const { emailInput, loginButton } = getInputs();
      const user = userEvent.setup();
      await user.type(emailInput, email);
      const error = screen.getByRole("paragraph", { name: "error" });

      if (scenario.includes("cleared")) {
        await user.clear(emailInput);

        expect(emailInput).toHaveValue("");
      } else {
        expect(emailInput).toHaveValue(email);
      }
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(errorMsg);
      expect(loginButton).toBeDisabled();
    }
  );
  it.each([
    {
      effect: "red prompt",
      scenario:
        "password shorter than 8 characters and the login button should be disabled",
      password: "sec",
      passwordClass: "text-red-500",
    },
    {
      effect: "green prompt",
      scenario:
        "password is 8 characters or longer and the login button should be disabled",
      password: "secret123",
      passwordClass: "text-green-600",
    },
  ])(
    "should display $effect if $scenario",
    async ({ password, passwordClass }) => {
      const { getInputs } = renderForm();
      const { passwordInput, loginButton } = getInputs();
      const user = userEvent.setup();
      await user.type(passwordInput, password);
      const parent = screen.getByRole("paragraph", { name: /prompt/i });
      const parentSpan = screen.getByTestId("password-span");
      const passwordPrompt = within(parent).getByText(
        /must be 8 characters long/i
      );

      expect(passwordInput).toHaveValue(password);
      expect(passwordPrompt).toBeInTheDocument();
      expect(parentSpan).toHaveClass(passwordClass);

      expect(loginButton).toBeDisabled();
    }
  );
  it("should render the sign up page when the sign up link is clicked", async () => {
    renderForm();
    const link = screen.getByRole("link", { name: /Signup/i });
    const user = userEvent.setup();
    await user.click(link);
    const signUpButton = screen.getByRole("button", { name: /signup/i });

    expect(link).toHaveTextContent(/Sign Up/i);
    expect(signUpButton).toBeInTheDocument();
  });
  it("should render then home page after login and display users name", async () => {
    const { submitForm } = renderForm();

    const user = db.user.findFirst({ where: { id: { equals: userId } } });
    await submitForm(user!.email, user!.password);

    const subHeading = await screen.findByTestId("search-subheading");
    const heading = screen.getByRole("heading", { name: /section heading/i });
    const userName = within(heading).getByText(
      new RegExp(user!.firstname, "i")
    );

    expect(subHeading).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
  });

  it("should display an error message if an error occurs", async () => {
    server.use(
      http.post(LOGIN_URL, () => {
        return HttpResponse.error();
      })
    );
    const { submitForm } = renderForm();

    const user = db.user.findFirst({ where: { id: { equals: userId } } });
    await submitForm(user!.email, user!.password);
    const loginErrorMsg = await screen.findByText(/Error/i);
    expect(loginErrorMsg).toBeInTheDocument();
  });
});
