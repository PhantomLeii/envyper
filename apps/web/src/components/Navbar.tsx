import React from "react";
import { FileRoutesByFullPath } from "@/routeTree.gen";
import { useAuth } from "@/context/Authentication";
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
} from "@heroui/react";

interface MenuItem {
  title: string;
  href: keyof FileRoutesByFullPath;
}

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated } = useAuth();

  const menuItems: MenuItem[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Docs",
      href: "/docs",
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-extrabold text-inherit tracking-tight">ENVYPER</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, i) => (
          <NavbarItem key={`${item.title}-${i}`}>
            <Link color="foreground" href={item.href}>
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <NavbarItem>
            <Button as={Link} color="primary" href="/dashboard" variant="flat">
              Dashboard
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button as={Link} color="primary" href="/auth" variant="flat">
              Sign In
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href={item.href}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
