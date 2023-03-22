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
      <Link href="/" className="text-2xl">OurMarket</Link>
      <div className="flex w-96 rounded p-2 outline outline-1 outline-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="h-6 w-6 stroke-slate-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <input
          type="text"
          placeholder="BenderBottle Classic V2 shaker"
          className="w-full bg-transparent pl-2 focus:outline-none"
          {...register("search")}
        />
      </div>
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
