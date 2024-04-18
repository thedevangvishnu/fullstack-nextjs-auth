import { Toaster } from "react-hot-toast";

export const MyToaster = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        className: "border-[2px] text-bold",
        style: {
          borderRadius: "30px",
          fontWeight: "500",
          fontSize: "14px",
        },
        success: {
          style: {
            borderColor: "#15b33a",
          },
        },
        error: {
          style: {
            borderColor: "#eb7159",
          },
        },
      }}
    />
  );
};
