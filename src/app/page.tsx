import Image from "next/image";
import { LoginButton } from "@/components/login-button";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {/* Hero section */}
      <div className="w-full h-full bg-neutral-900 absolute inset-0">
        <Image
          src="/images/bg1.jpg"
          alt="Banner Poster"
          layout="fill"
          objectFit="cover"
          className="w-full opacity-90"
        />
      </div>

      {/* overlay */}
      <div className="w-full h-[300px] md:h-[400px] absolute bottom-0 left-0 bg-gradient-to-t from-black z-10"></div>

      <div className="w-full max-w-[600px] lg:max-w-[750px] z-30 px-2 flex flex-col items-center justify-center gap-6 md:gap-8">
        <h1 className="text-5xl lg:text-7xl text-center text-white font-bold drop-shadow-lg">
          You are the creator of your own destiny
        </h1>
        <LoginButton text="Sign in" link="/auth/login" />
      </div>
    </div>
  );
}
