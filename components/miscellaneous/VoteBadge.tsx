import classNames from "classnames";

type size = "sm" | "lg";

const VoteBadge = ({ vote, size = "sm" }: { vote: number; size?: size }) => {
  const ringColor = classNames(
    { "ring-green-500": vote >= 7 },
    { "ring-yellow-500": vote >= 5.5 && vote < 7 },
    { "ring-red-500": vote < 5.5 }
  );

  const badgeSize = classNames(
    { "w-8 h-8 text-xs": size === "sm" },
    { "w-12 h-12": size === "lg" }
  );

  return (
    <div
      className={`${badgeSize} grid bg-gray-900/50 font-semibold rounded-full ${ringColor} ring-2 place-items-center hover:scale-110 transition-transform duration-200`}
    >
      {vote.toFixed(1)}
    </div>
  );
};

export default VoteBadge;
