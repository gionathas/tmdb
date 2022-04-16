import Link from "next/link";
import React from "react";

// TODO: add scroll effect
const Header = () => {
  return (
    <header className="fixed inset-x-0 z-10 w-full px-10 mx-auto bg-transparent ">
      <div className="flex items-center justify-between py-4">
        <div className="flex space-x-10">
          <Logo />
          <NavLinks />
        </div>
        <SignIn />
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <Link href="/" passHref>
      <div className="w-32 cursor-pointer">
        <img
          className="object-contain w-full h-full"
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          alt="TMDB Logo"
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

const SignIn = () => {
  return (
    <div className="py-2 text-xs tracking-wide uppercase btn btn-primary px-9">
      Sign In
    </div>
  );
};

export default Header;
