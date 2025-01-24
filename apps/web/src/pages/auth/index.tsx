import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo } from "react";
import { Hanko, register } from "@teamhanko/hanko-elements";
import { useRouter } from "@tanstack/react-router";
import { useAuth } from "@/context/Authentication";

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

export const Route = createFileRoute("/auth/")({
  component: AuthenticationForm,
});

function AuthenticationForm() {
  const { navigate } = useRouter();
  const hanko = useMemo(() => new Hanko(hankoApi), []);

  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    navigate({ to: "/" });
  }

  const redirectAfterLogin = useCallback(() => {
    navigate({ to: "/" });
  }, [navigate]);

  useEffect(
    () =>
      hanko.onSessionCreated(() => {
        redirectAfterLogin();
      }),

    [hanko, redirectAfterLogin],
  );

  useEffect(() => {
    register(hankoApi).catch((err) => {
      // send to exeption tracking service
      if (import.meta.env.NODE_ENV !== "production") console.log(err);
    });
  }, []);

  return (
    <>
      <main className="min-h-[calc(100vh-64px)] w-full grid place-items-center">
        <hanko-auth />
      </main>
    </>
  );
}
