import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("@react-oauth/google");
// vi.mock("react-router-dom", async() => {
//     const routerDom = await vi.importActual('react-router-dom')
//     return{
//         ...routerDom,
//         default:{

//         }
//     }
// });

// useNavigate: () => vi.fn(),
// Link: () => vi.fn(),
