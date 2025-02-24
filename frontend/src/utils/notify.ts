import { toast, TypeOptions } from "react-toastify";

export const notify = (message: string, type: TypeOptions) => {
  toast.success(message, {
    type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
