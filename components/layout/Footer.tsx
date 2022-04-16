import React from "react";

// TODO:
const Footer = () => {
  return (
    <div className="absolute inset-x-0 p-6 text-sm bg-black -bottom-44">
      <div className="flex items-center">
        <img
          className="w-10 h-10"
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt="tmdb logo"
        />
        <div className="flex ml-20 space-x-5">
          <div>Columns</div>
          <div>Columns</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
