"use client"

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function Footer() {
  const { data: session, status } = useSession();

  return (
    <footer className="w-full bg-muted">
      <div className="flex justify-between items-center px-32 py-6">
        <div title="left-side-footer" className="flex gap-4">
          <span><a href="https://github.com/tysanders-repo">Github</a></span>
          <span><a href="https://www.linkedin.com/in/tyasanders/">Indeed</a></span>
          <span>Portfolio</span>
        </div>
        <div title="right-side-footer">
        <Button 
          size="lg"
          className="rounded-full text-base"
          onClick={() => {session? signOut({redirectTo: '/'}) : signIn()}}>
            {session ? 'sign out' : 'sign in'}
        </Button>
        </div>
      </div>
    </footer>
  );
}
