import Image from "next/image";

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
      <div className="w-full md:w-1/2">{children}</div>
    </main>
  );
}
