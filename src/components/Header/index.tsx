import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface SearchFields {
  search: string;
}

const Header: React.FC = () => {
  const { register } = useForm<SearchFields>();
  const { data: sessionData } = useSession();
  return (
    <header className="flex items-center justify-between bg-white p-6 drop-shadow-sm">
      <Link href="/" className="text-2xl">
        OurMarket
      </Link>

      <div className="flex items-center justify-center gap-4">
        {sessionData && (
          <>
            <Image
              width="32"
              height="32"
              src={sessionData.user.image || ""}
              alt="profile"
              className="rounded-full"
            />
            <p className="text-center text-lg">
              <span>{sessionData.user?.name}</span>
            </p>
          </>
        )}
        <button
          className="rounded p-2 outline outline-1 outline-black "
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </header>
  );
};

export default Header;
