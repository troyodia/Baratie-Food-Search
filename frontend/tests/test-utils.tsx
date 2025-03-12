import { render } from "@testing-library/react";
import React, { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
export const renderWithRouter = (
  ui: ReactNode,
  { route = "/" }: { route: string }
) => {
  return render(<MemoryRouter initialEntries={[route]}> {ui}</MemoryRouter>);
};
