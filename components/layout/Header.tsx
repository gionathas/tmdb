import Properties from "config/properties";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useWindowScroll } from "react-use";

const Header = () => {
  const { headerScrollYOffset } = Properties;
  const { y } = useWindowScroll();

  const bgClass = y >= headerScrollYOffset ? "bg-black" : "bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 z-10 w-full px-10 mx-auto transition-colors duration-300 ${bgClass} `}
    >
      <div className="flex items-center justify-between py-4">
        <div className="flex space-x-10">
          <Logo />
          <NavLinks />
        </div>
        <SignInButton />
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <Link href="/" passHref>
      <div className="relative w-32 cursor-pointer">
        <Image
          src={Properties.logoPath}
          alt="TMDB Logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </Link>
  );
};

const NavLinks = () => {
  return (
    <nav className="flex space-x-6 font-light">
      <Link href="#" passHref>
        <div className="link">Movies</div>
      </Link>
      <Link href="#" passHref>
        <div className="link">Tv Shows</div>
      </Link>
      <Link href="#" passHref>
        <div className="link">People</div>
      </Link>
    </nav>
  );
};

const SignInButton = () => {
  return (
    <div className="py-2 text-xs tracking-wide uppercase btn btn-primary px-9">
      Sign In
    </div>
  );
};

export default Header;
