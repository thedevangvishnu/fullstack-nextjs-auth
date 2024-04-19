import { ErrorCard } from "@/components/auth/error-card";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-tr from-red-500 to-orange-300">
      <ErrorCard />
    </div>
  );
};

export default ErrorPage;
