import { signIn, signOut, auth } from "@/auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <h1 className="text-4xl">Art Gallery</h1>
        </Link>

        <div className="flex gap-5 items-center text-xl">
          {session && session?.user ? (
            <>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Sign-Out</button>
              </form>

              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button type="submit">Sign-In</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
