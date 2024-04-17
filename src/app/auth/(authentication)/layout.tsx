import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-screen flex">
      <div className="h-full hidden invisible md:block md:visible md:w-1/2 relative">
        <Image
          src="/images/bg2.jpg"
          alt="Banner Poster"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="w-full md:w-1/2">
        <Button variant="link" asChild className="absolute top-1 right-3">
          <Link
            href="/"
            className="flex items-center gap-1 text-neutral-600 hover:text-neutral-800"
          >
            <AiOutlineArrowLeft />
            Back to Home
          </Link>
        </Button>
        {children}
      </div>
    </main>
  );
}
