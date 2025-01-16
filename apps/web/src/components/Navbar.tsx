import React from "react";
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
} from "@nextui-org/react";
import type { FileRoutesByFullPath } from "@/routeTree.gen";

type MenuItem = {
  title: string;
  href: keyof FileRoutesByFullPath;
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  let menuItems: MenuItem[];

  menuItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
  ];

  if (true) {
    menuItems = [
      ...menuItems,
      {
        title: "My Projects",
        href: "/projects",
      },
      {
        title: "Settings",
        href: "/settings",
      },
    ];
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">ENVYPER</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, i) => (
          <NavbarItem key={`${item.href}-${i}`}>
            <Link href={item.href}>{item.title}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/sign-in">Sign In</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/sign-up" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, i) => (
          <NavbarMenuItem key={`${item.href}-${i}`}>
            <Link href={item.href}>{item.title}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
