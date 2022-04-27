import classNames from "classnames";
import Properties from "config/properties";
import useWindowScroll from "hooks/useWindowScroll";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { headerScrollYOffset } = Properties;
  const pageYScroll = useWindowScroll();

  return (
    <header
      className={classNames(
        "base-padding fixed inset-x-0 z-20 w-full transition-colors duration-300",
        {
          "bg-black": pageYScroll >= headerScrollYOffset,
          "bg-transparent": pageYScroll < headerScrollYOffset,
        }
      )}
    >
      <div className="flex items-center justify-between py-3 md:py-4">
        <div className="flex items-center space-x-10">
          <Logo />
          <NavLinks />
        </div>
        <SignInButton />
      </div>
    </header>
  );
};

const Logo = () => {
  const { logoPath: logo } = Properties;
  return (
    <Link href="/" passHref>
      <div className="relative w-24 h-8 cursor-pointer sm:w-28 md:w-32">
        <Image src={logo} alt="TMDB Logo" layout="fill" objectFit="contain" />
      </div>
    </Link>
  );
};

const NavLinks = () => {
  return (
    <nav className="hidden md:space-x-6 md:font-light md:flex">
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
    <div className="hidden py-2 text-xs tracking-wide uppercase md:block btn btn-primary px-9">
      Sign In
    </div>
  );
};

export default Header;
