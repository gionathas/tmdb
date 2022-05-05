import { UserIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import SignInButton from "components/miscellaneous/buttons/SignInButton";
import SearchInput from "components/miscellaneous/SearchInput";
import Properties from "config/properties";
import routes from "config/routes";
import useMediaQuery from "hooks/useMediaQuery";
import useWindowScroll from "hooks/useWindowScroll";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const { DEFAULT_HEADER_SCROLL_Y_OFFSET: headerScrollYOffset, LOGO_PATH: logo } =
  Properties;

type HeaderProps = React.ComponentPropsWithoutRef<"header">;

const Header = ({ className, ...rest }: HeaderProps) => {
  const pageYScroll = useWindowScroll();
  const isSmallScreen = useMediaQuery("(min-width: 640px)");
  const router = useRouter();
  const isSearchPage = router.pathname === routes.searchPage;

  const search = useCallback(
    (query: string) => {
      router.push(`${routes.searchPage}?query=${query}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <header
      className={classNames(
        "base-padding fixed inset-x-0 z-20 w-full transition-colors duration-300",
        {
          "bg-black": pageYScroll >= headerScrollYOffset,
          "bg-transparent": pageYScroll < headerScrollYOffset,
        },
        className
      )}
      {...rest}
    >
      <div className="flex items-center justify-between py-3 md:py-4">
        <div className="flex items-center space-x-10">
          <Logo />
          <NavLinks />
        </div>
        <div className="flex items-center space-x-3">
          {isSmallScreen ? (
            <>
              {!isSearchPage && <SearchInput onSearch={search} />}
              <SignInButton />
            </>
          ) : (
            <>
              {/* {!isSearchPage && (
                <Link href={routes.searchPage} passHref>
                  <SearchIcon className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" />
                </Link>
              )} */}
              <UserIcon className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <Link href={routes.indexPage} passHref>
      <div className="relative w-24 h-8 cursor-pointer sm:w-28 md:w-32">
        <Image
          src={logo}
          alt="TMDB Logo"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
    </Link>
  );
};

const NavLinks = () => {
  return (
    <nav className="hidden md:space-x-6 md:font-light md:flex">
      <Link href="#" passHref>
        <div className="link">Discover</div>
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

export default Header;
