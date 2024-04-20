import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/legacy/image";
import Link from "next/link";

const SettingsPage = async () => {
  const session = await auth();
  console.log({ session });

  if (session?.user) {
    const { name, email, image, role } = session?.user;
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-neutral-950 text-white">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-6">
            <div className="w-[120px] h-[120px] overflow-hidden rounded-full border-2 border-orange-500">
              <Image
                src={image || "/images/fallback-user.png"}
                alt="User poster"
                width={150}
                height={150}
                className=""
              />
            </div>

            <div>
              <h2 className="text-3xl font-semibold">{name}</h2>
              <div className="text-neutral-400 mt-4">
                <h3>
                  Email: <span>{email}</span>
                </h3>
                <h3>
                  Role: <span>{role}</span>
                </h3>
              </div>
            </div>
          </div>

          <form
            action={async () => {
              "use server";

              await signOut({ redirectTo: "/" });
            }}
          >
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-[300px] h-12 font-semibold rounded-[40px] text-white bg-orange-600 hover:bg-orange-500 hover:shadow-lg duration-200 uppercase"
            >
              SIGN OUT
            </Button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-2 bg-neutral-950 text-white">
        <h2>Ooopss! Something is wrong</h2>
        <Button variant="link" asChild>
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </div>
    );
  }
};

export default SettingsPage;
