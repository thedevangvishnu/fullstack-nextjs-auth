import { FaCheckCircle } from "react-icons/fa";

export const SuccessMessage = ({ message }: { message?: string }) => {
  return (
    <div className="w-[90%] rounded-[30px] flex items-center justify-center gap-2 py-2 bg-white border-2 border-green-600">
      <FaCheckCircle className="text-green-600" />
      <p className="font-semibold text-green-600">{message}</p>
    </div>
  );
};
