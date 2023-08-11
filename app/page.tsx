"use client";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { useSession } from "@/context/session";
import LoadingComponent from "@/components/Loading/PageLoadingComponent";
// path : /
//TODO home page or welcome screen needed to be created gere
export default function Home() {
  const { session, loading } = useSession();
  const user_id = session?.identity?.id as any;

  if (loading) {
    return <LoadingComponent></LoadingComponent>;
  }

  return (
    <div className="flex flex-col mt-36 items-center text-center">
      <h1 className="text-7xl font-bold">Galoy Withdraw</h1>
      <p className="mt-1 text-6xl">Start creating withdraw links</p>
      <div className="flex flex-col mt-8 space-y-4">
        {user_id ? (
          <>
            <Link href={`/user/${user_id}/links`}>
              <Button>My links</Button>
            </Link>
            <Link href="/create">
              <Button>Create new Link</Button>
            </Link>
          </>
        ) : (
          <>
            <Link href={`/auth/login`}>
              <Button>Login</Button>
            </Link>
            <Link href="/auth/registration">
              <Button>Register</Button>
            </Link>
          </>
        )}
        <Link href="/voucher">
          <Button>Redeem Voucher</Button>
        </Link>
      </div>
    </div>
  );
}
