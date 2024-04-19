import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      title="Error"
      description=""
      secondaryActionLabel="Back to Login"
      secondaryActionLink="/auth/login"
      hasBorder
      hasBg
    >
      <div></div>
    </CardWrapper>
  );
};
