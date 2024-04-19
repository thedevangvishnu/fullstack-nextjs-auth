import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export const UrlErrorToaster = ({ error }: { error: string }) => {
  useEffect(() => {
    toast.error(error);
  }, [error]);

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
        error: {
          style: {
            borderColor: "#eb7159",
          },
        },
      }}
    />
  );
};
