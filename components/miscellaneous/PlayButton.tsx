const PlayButton = () => {
  return (
    <div className="relative grid w-full h-full place-items-center">
      {/* white background container with svg play button inside */}
      <div
        aria-hidden="true"
        className="grid pl-1.5 bg-white rounded-full w-14 h-14 place-content-center ring-4 ring-gray-600"
      >
        {/* svg play button */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 fill-primary-400"
          viewBox="0 0 24 24"
        >
          <path d="M3 22v-20l18 10-18 10z" />
        </svg>
      </div>
    </div>
  );
};

export default PlayButton;
