"use clinet";

import { CardWrapper } from "./card-wrapper";

export const LoginForm = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CardWrapper
        title="Login"
        description="Delighed to have you here!"
        secondaryActionLink="/auth/register"
        secondaryActionLabel="Don't have an account? Sign Up"
        hasSocialSignOn
      ></CardWrapper>
    </div>
  );
};
