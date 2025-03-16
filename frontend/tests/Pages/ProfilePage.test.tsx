import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { it, expect, describe, beforeAll, afterAll } from "vitest";
import ProfilePage from "../../src/pages/ProfilePage";
import React from "react";
import AllWrapers from "../AllWrapers";
import { renderWithRouter } from "../test-utils";
import { db } from "../mocks/db";
import { server } from "../mocks/server";
import { delay, http, HttpResponse } from "msw";
import { Route, Routes } from "react-router-dom";
import {
  BASE_URL,
  GET_AUTH_USER_URL,
  UPDATE_PROFILE,
} from "../../src/apis/URLS";

describe("Profile Page", () => {
  let userId: number;

  beforeAll(async () => {
    const user = db.user.create();

    userId = user.id;
  });
  afterAll(() => {
    db.user.delete({ where: { id: { equals: userId } } });
  });
  const renderForm = async () => {
    renderWithRouter(
      <AllWrapers>
        <Routes>
          <Route path="/user-profile" element={<ProfilePage />}></Route>
        </Routes>
      </AllWrapers>,
      { route: "/user-profile" }
    );
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId(/loading-lottie/i)
    );
    const emailInput = screen.getByRole<HTMLInputElement>("textbox", {
      name: /email/i,
    });
    const firstNameInput = screen.getByRole<HTMLInputElement>("textbox", {
      name: /first name/i,
    });
    const lastNameInput = screen.getByRole<HTMLInputElement>("textbox", {
      name: /last name/i,
    });
    const addressInput = screen.getByRole<HTMLInputElement>("textbox", {
      name: /address/i,
    });
    const cityInput = screen.getByRole<HTMLInputElement>("textbox", {
      name: /city/i,
    });
    const countryInput = screen.getByRole<HTMLInputElement>("textbox", {
      name: /country/i,
    });
    const submitButton = screen.getByRole("button", { name: /profile/i });
    const clearForm = async () => {
      const user = userEvent.setup();
      await user.clear(emailInput);
      await user.clear(firstNameInput);
      await user.clear(lastNameInput);
      await user.clear(addressInput);
      await user.clear(cityInput);
      await user.clear(countryInput);
    };
    const submitForm = async (
      email: string,
      firstname: string,
      lastname: string,
      address: string,
      city: string,
      country: string
    ) => {
      const user = userEvent.setup();

      await user.type(emailInput, email);
      await user.type(firstNameInput, firstname);
      await user.type(lastNameInput, lastname);
      await user.type(addressInput, address);
      await user.type(cityInput, city);
      await user.type(countryInput, country);
      await user.click(submitButton);
    };
    return {
      getInputs: async () => {
        return {
          emailInput,
          firstNameInput,
          lastNameInput,
          addressInput,
          cityInput,
          countryInput,
          submitButton,
        };
      },
      clearForm,
      submitForm,
    };
  };
  it("should render profile form", async () => {
    const { getInputs } = await renderForm();

    const {
      emailInput,
      firstNameInput,
      lastNameInput,
      addressInput,
      cityInput,
      countryInput,
      submitButton,
    } = await getInputs();
    expect(emailInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(countryInput).toBeInTheDocument();
    expect(submitButton).toHaveTextContent(/Submit/i);
    // screen.debug(undefined, Infinity);
  });
  it("should populate the input fields with fetched user data and submit button should be disabled", async () => {
    const { getInputs } = await renderForm();

    const user = db.user.findFirst({ where: { id: { equals: userId } } });
    const {
      emailInput,
      firstNameInput,
      lastNameInput,
      addressInput,
      cityInput,
      countryInput,
      submitButton,
    } = await getInputs();
    expect(emailInput.value).toBe(user!.email);
    expect(firstNameInput.value).toBe(user!.firstname);
    expect(lastNameInput.value).toBe(user!.lastname);
    expect(addressInput.value).toBe(user!.address);
    expect(cityInput.value).toBe(user!.city);
    expect(countryInput.value).toBe(user!.country);
    expect(submitButton).toBeDisabled();
  });
  it("should display error messages for all fields and submit button disabled when fetched data is cleared from form", async () => {
    const { clearForm, getInputs } = await renderForm();
    const { submitButton } = await getInputs();
    await clearForm();

    const errorMsgs = screen.getAllByRole("paragraph", { name: /error/i });
    errorMsgs.forEach((elem) => {
      console.log(elem.innerHTML);
    });
    expect(errorMsgs.length).toBe(6);
    expect(submitButton).toBeDisabled();
  });
  it(`should display error messages when invaild email is entered and
     more than 10 characters are entered for first and last names`, async () => {
    const { clearForm, getInputs } = await renderForm();
    const { submitButton, emailInput, firstNameInput, lastNameInput } =
      await getInputs();
    await clearForm();
    const user = userEvent.setup();
    await user.type(emailInput, "notavalidemail");
    await user.type(firstNameInput, "jamesjamesjames");
    await user.type(lastNameInput, "vanesvanesvanes");

    const emailErrorMsg = screen.getByText("Invalid email provided");
    const firstNameErrorMsg = screen.getByText(
      "first name must not be longer than 10 characters"
    );
    const lastNameErrorMsg = screen.getByText(
      "last name must not be longer than 10 characters"
    );
    expect(emailErrorMsg).toBeInTheDocument();
    expect(firstNameErrorMsg).toBeInTheDocument();
    expect(lastNameErrorMsg).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
  it("should submit the form and show submit form loading state when fetching data", async () => {
    server.use(
      http.post(BASE_URL + UPDATE_PROFILE, async () => {
        await delay(500);
        const user = db.user.getAll();
        return HttpResponse.json({ user: user[0] });
      })
    );
    const user = db.user.create();
    const { clearForm, submitForm } = await renderForm();

    await clearForm();
    await submitForm(
      user.email,
      user.firstname,
      user.lastname,
      user.address,
      user.city,
      user.country
    );
    const loadingButton = await screen.findByText(/submitting/i);
    screen.debug(undefined, Infinity);
    expect(loadingButton).toBeInTheDocument();
    db.user.delete({ where: { id: { equals: user.id } } });
  });
  it("should remove the loading state from the submit button after fetching data", async () => {
    const user = db.user.create();
    const { clearForm, submitForm } = await renderForm();
    await clearForm();
    await submitForm(
      user.email,
      user.firstname,
      user.lastname,
      user.address,
      user.city,
      user.country
    );
    await waitForElementToBeRemoved(() => screen.queryByText(/submitting/i));
    db.user.delete({ where: { id: { equals: user.id } } });
  });
  it("should submit form and fill input fields with fetched data", async () => {
    const user = db.user.create();
    server.use(
      http.get(BASE_URL + GET_AUTH_USER_URL, () => {
        return HttpResponse.json({ user });
      }),
      http.post(BASE_URL + UPDATE_PROFILE, async () => {
        await delay();

        return HttpResponse.json({ user });
      })
    );

    const { getInputs, clearForm, submitForm } = await renderForm();
    const {
      emailInput,
      firstNameInput,
      lastNameInput,
      addressInput,
      cityInput,
      countryInput,
    } = await getInputs();
    await clearForm();
    await submitForm(
      user.email,
      user.firstname,
      user.lastname,
      user.address,
      user.city,
      user.country
    );
    console.log(emailInput.value);
    expect(emailInput.value).toBe(user!.email);
    expect(firstNameInput.value).toBe(user!.firstname);
    expect(lastNameInput.value).toBe(user!.lastname);
    expect(addressInput.value).toBe(user!.address);
    expect(cityInput.value).toBe(user!.city);
    expect(countryInput.value).toBe(user!.country);
    db.user.delete({ where: { id: { equals: user.id } } });
  });
});
