import Image from "next/legacy/image";

export default function RedirectPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-full bg-neutral-900 absolute inset-0">
        <Image
          src="/images/bg3.jpg"
          alt="Banner Poster"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="opacity-90"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+DeP+T8ABtwCnxlCO1oAAAAASUVORK5CYII="
        />
      </div>
      <div className="w-full h-[300px] md:h-[400px] absolute bottom-0 left-0 bg-gradient-to-t from-black z-10"></div>
      <div className="w-full z-10 flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}
