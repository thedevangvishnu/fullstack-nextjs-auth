import { BiSolidError } from "react-icons/bi";

export const ErrorMessage = ({ message }: { message?: string }) => {
  return (
    <div className="w-[90%] rounded-[30px] flex items-center justify-center gap-1 py-2 bg-white border-2">
      <BiSolidError className="text-red-700 text-xl" />
      <p className="font-semibold text-red-700">{message}</p>
    </div>
  );
};
