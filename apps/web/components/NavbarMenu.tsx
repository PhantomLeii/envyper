import React from "react";
import { useRouter } from "@tanstack/react-router";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export function Component() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [pathname, setPathname] = React.useState("");
  const router = useRouter().state;
  const { user, signOut } = useClerk();

  React.useEffect(() => {
    setPathname(router.location.pathname);
  });

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ENVYPER</p>
        </NavbarBrand>
      </NavbarContent>

      <SignedOut>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem
              key={`${item.label}-${index}`}
              isActive={pathname === item.href}
            >
              <Link color="foreground" href={item.href}>
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </SignedOut>

      <SignedOut>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/sign-in">Sign In</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="sign-up" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </SignedOut>

      <SignedIn>
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.fullName || user?.emailAddresses[0]?.emailAddress}
                size="sm"
                src={user?.imageUrl}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </DropdownItem>
              <DropdownItem key="home">
                <Link href="/">Home</Link>
              </DropdownItem>
              <DropdownItem key="projects">
                <Link href="/projects">My Projects</Link>
              </DropdownItem>
              <DropdownItem key="docs">
                <Link href="/docs">Docs</Link>
              </DropdownItem>
              <DropdownItem
                onPress={() => signOut()}
                key="logout"
                color="danger"
              >
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </SignedIn>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link className="w-full" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

type MenuItem = {
  id: number;
  label: string;
  href: "/about" | "/docs" | "/" | "." | "..";
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "About",
    href: "/about",
  },
  {
    id: 3,
    label: "Docs",
    href: "/docs",
  },
];
