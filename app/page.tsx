"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// path : /
//TODO home page or welcome screen needed to be created gere
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Galoy Withdraw</h1>
      <p className="mt-1">Start creating withdraw links</p>
      <div className="flex flex-col mt-8 space-y-4">
        <Link
          href="/user/aaaaaaaa-e098-4a16-932b-e4f4abc24366/links"
          className="bg-zinc-700 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          <button>My links</button>
        </Link>
        <Link
          href="/create"
          className="bg-zinc-700 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          <button>Create new Link</button>
        </Link>
      </div>
    </div>
  );
}
