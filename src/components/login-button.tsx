import Link from "next/link";
import { Button } from "./ui/button";

type LoginButtonProps = {
  link: string;
  text: string;
};

export const LoginButton = ({ link, text }: LoginButtonProps) => {
  return (
    <Button
      variant="default"
      size="lg"
      asChild
      className="font-semibold text-lg w-52 h-14 rounded-[40px] border-[1px] border-orange-200 backdrop-blur-xl bg-transparent hover:bg-transparent hover:border-white hover:shadow-lg duration-200 uppercase"
    >
      <Link href={link} prefetch={false}>
        {text}
      </Link>
    </Button>
  );
};
