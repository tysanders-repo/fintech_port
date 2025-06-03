import { HydrateClient } from "~/trpc/server";
import { SignUpLoginForm } from "../_components/signuplogin";
import { useSession } from "next-auth/react";
import { auth } from "~/server/auth";

export default async function Login() {

  return(
    <HydrateClient>
      <p>
        Dashboard
      </p>

    </HydrateClient>
  );
}