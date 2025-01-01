import { ClerkProvider } from "@clerk/nextjs";

type ProvidersProps = {
  children: React.ReactNode;
};

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function Providers(props: ProvidersProps) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {props.children}
    </ClerkProvider>
  );
}
