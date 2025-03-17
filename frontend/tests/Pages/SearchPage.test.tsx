import { screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { it, expect, describe, beforeAll, afterAll, vi } from "vitest";
import React from "react";
import AllWrapers from "../AllWrapers";
import { renderWithRouter } from "../test-utils";
import { db } from "../mocks/db";
import { server } from "../mocks/server";
import { delay, http, HttpResponse } from "msw";
import { Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

import { BASE_URL, SEARCH_FOR_RESTAURANT } from "../../src/apis/URLS";
import HomePage from "../../src/pages/HomePage";
import SeachResultsPage from "../../src/pages/SeachResultsPage";
const cuisineItmesArrays = [
  ["american", "indian"],
  ["american", "indian"],
  ["american", "indian"],
  ["american", "indian"],
  ["american", "organic"],
  ["american", "spanish"],
  ["american", "bbq"],
];
const sortOptionsArr = [
  "Best Match",
  "Delivery Price",
  "Estimated Delivery Time",
];
describe("Search Page", () => {
  const restaurantIds: number[] = [];
  let userId: number;

  beforeAll(async () => {
    const user = db.user.create();
    userId = user.id;
    cuisineItmesArrays.forEach((arr) => {
      const menu = [db.menus.create()];
      const restaurant = db.restaurant.create({
        menu: menu,
        cuisineItems: arr,
      });
      restaurantIds.push(restaurant.id);
    });
  });
  afterAll(() => {
    db.user.delete({ where: { id: { in: restaurantIds } } });
    db.user.delete({ where: { id: { equals: userId } } });
  });
  const renderPage = (route: string) => {
    renderWithRouter(
      <AllWrapers>
        <Routes>
          <Route path="/results" element={<SeachResultsPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </AllWrapers>,
      { route: route }
    );

    const searchBar = screen.getByRole("textbox", { name: /search bar/i });
    const searchButton = screen.getByRole("button", { name: /search button/i });

    const searchForRestaurant = async (search: string) => {
      const user = userEvent.setup();

      await user.type(searchBar, search);

      await user.click(searchButton);
    };
    return {
      getInputs: () => {
        return {
          searchBar,
          searchButton,
        };
      },
      searchForRestaurant,
    };
  };
  it("should have search baar and button on home page", () => {
    const { getInputs } = renderPage("/");
    const { searchBar, searchButton } = getInputs();

    expect(searchBar).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it(`should search for restaurants from on the hompage, 
        then navigate to the search page and display the page with the restaurants`, async () => {
    const { searchForRestaurant } = renderPage("/");

    await searchForRestaurant("american");
    const restuarantResults = screen.getAllByRole("link", {
      name: "restuarant link",
    });
    const searchBar = screen.getByRole("textbox", { name: /search bar/i });
    const searchButton = screen.getByRole("button", { name: /search button/i });

    expect(restuarantResults.length).toBe(7);
    expect(searchBar).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it("should render the search results page with correct cuisine filter UI", async () => {
    //passing query paramerters to create search for restaurants that match 'american'
    renderPage("/results?search=american&sortBy=best_match&page=1");

    const collapseFiltersButton = screen.getByRole("button", {
      name: /collapse/i,
    });
    const resetButton = screen.getByText(/Reset/i);
    const user = userEvent.setup();
    await user.click(collapseFiltersButton);
    const filterButtons = screen.getAllByRole("button", {
      name: /filter button/i,
    });

    expect(filterButtons.length).toBe(26);
    expect(collapseFiltersButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });
  it("should render the sort drop down menu correctly", async () => {
    renderPage("/results?search=american&sortBy=best_match&page=1");
    const sortButton = screen.getByText(/Sort By:/i);
    const user = userEvent.setup();
    await user.click(sortButton);

    const sortOptions = await screen.findAllByRole("menuitem");

    sortOptionsArr.forEach((option, index) => {
      expect(sortOptions[index].textContent).toBe(option);
    });
    expect(sortOptions.length).toBe(3);
    expect(sortButton).toBeInTheDocument();
    // role="menuitem"
  });
  it("should render pagination properly when search results exist", async () => {
    renderPage("/results?search=american&sortBy=best_match&page=1");

    const nextButton = await screen.findByRole("listitem", {
      name: /next/i,
    });
    const previousButton = screen.getByRole("listitem", {
      name: /previous/i,
    });
    const pageNumbers = screen.getAllByRole("listitem", {
      name: /pagination/i,
    });

    expect(nextButton).toBeInTheDocument();
    expect(within(nextButton).getByTestId("next-button")).not.toHaveClass(
      "text-slate-500"
    );
    expect(previousButton).toBeInTheDocument();
    expect(within(previousButton).getByTestId("previous-button")).toHaveClass(
      "text-slate-500"
    );
    expect(pageNumbers.length).toBe(2);
  });
  it("should render the correct search results when filtered by cuisine", async () => {
    server.use(
      http.get(BASE_URL + SEARCH_FOR_RESTAURANT, async () => {
        const allRestrauants = db.restaurant.getAll();
        const restrauants = allRestrauants.filter((restaurant) => {
          return restaurant.cuisineItems.includes("indian");
        });
        // console.log(restrauants.length);
        return HttpResponse.json({ restrauants, resturantCount: 14 });
      })
    );
    renderPage("/results?search=american&sortBy=best_match&page=1");

    const filterButtons = screen.getAllByRole("button", {
      name: /filter button/i,
    });

    const user = userEvent.setup();
    await user.click(filterButtons[2]);
    // screen.debug(undefined, Infinity);

    const restuarantResults = await screen.findAllByRole("link", {
      name: "restuarant link",
    });
    expect(restuarantResults.length).toBe(4);
  });
  it("should render not found component when there are no results for a search", async () => {
    server.use(
      http.get(BASE_URL + SEARCH_FOR_RESTAURANT, async () => {
        delay();
        return HttpResponse.json({ restrauants: [] });
      })
    );
    //passing query paramerters to create search for no results to be found
    renderPage("/results?search=kkkk&sortBy=best_match&page=1");

    const noResultsImage = await screen.findByTestId("no-results-found");
    const noResultsMainText = screen.getByText(/find any results/i);
    const noResultsSubText = screen.getByText(/try searching/i);

    expect(noResultsImage).toBeInTheDocument();
    expect(noResultsMainText).toBeInTheDocument();
    expect(noResultsSubText).toBeInTheDocument();
  });
  it.each([
    {
      sortBy: "deliveryPrice",
      name: "Delivery Price",
      dropDownIndex: 1,
    },
    {
      sortBy: "deliveryTime",
      name: "Delivery Time",
      dropDownIndex: 2,
    },
  ])(
    "should render the sort button correctly and properly sort the search results by $name",
    async ({ sortBy, dropDownIndex }) => {
      const allRestrauants = db.restaurant.getAll();
      const restrauants = allRestrauants
        .filter((restaurant) => {
          return restaurant.cuisineItems.includes("american");
        })
        .sort((a, b) => a[sortBy] - b[sortBy]);

      server.use(
        http.get(BASE_URL + SEARCH_FOR_RESTAURANT, async () => {
          return HttpResponse.json({ restrauants, resturantCount: 14 });
        })
      );
      renderPage("/results?search=american&sortBy=best_match&page=1");

      const sortButton = screen.getByRole("button", { name: /sort button/i });
      const user = userEvent.setup();
      await user.click(sortButton);

      const sortOptions = screen.getAllByRole("button", {
        name: /sort dropdown/i,
      });

      await user.click(sortOptions[dropDownIndex]);

      const restuarantResults = screen.getAllByRole("link", {
        name: "restuarant link",
      });

      restuarantResults.forEach((restrauant, index) => {
        //parametize
        const query = within(restrauant).getByTestId("delivery-price");
        const price = query.textContent?.slice(
          query.textContent.indexOf("$") + 1
        );
        expect(price).toBe(restrauants[index].deliveryPrice.toString());
      });
      expect(sortButton).toHaveTextContent(
        `Sort By: ${sortOptions[dropDownIndex].textContent}`
      );
    }
  );
  it("should render page 2 of the search results when the next button is clicked", async () => {
    renderPage("/results?search=kkkk&sortBy=best_match&page=1");
    //mock scrollintoview since its not implemented in jsdom
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    const nextButton = await screen.findByRole("listitem", {
      name: /next/i,
    });
    const btn = within(nextButton).getByTestId("next-button");

    const user = userEvent.setup();
    await user.click(btn);
    const restuarantResults = await screen.findAllByRole("link", {
      name: "restuarant link",
    });
    expect(restuarantResults.length).toBe(7);
    expect(await screen.findByTestId("next-button")).toHaveClass(
      "text-slate-500"
    );
    expect(await screen.findByTestId("previous-button")).not.toHaveClass(
      "text-slate-500"
    );
  });
  it("should render page 2 of the search results when the page-2 button is clicked", async () => {
    //mock scrollintoview since its not implemented in jsdom
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    renderPage("/results?search=kkkk&sortBy=best_match&page=1");

    const pageNumbers = await screen.findAllByRole("listitem", {
      name: /pagination/i,
    });
    const btn = within(pageNumbers[1]).getByTestId("page-number");

    const user = userEvent.setup();
    await user.click(btn);
    const restuarantResults = await screen.findAllByRole("link", {
      name: "restuarant link",
    });
    const newPageNumbers = await screen.findAllByTestId("page-number");
    expect(restuarantResults.length).toBe(7);
    expect(newPageNumbers[0]).not.toHaveClass("bg-[#97bcf4]");
    expect(newPageNumbers[1]).toHaveClass("bg-[#97bcf4]");
  });
});
