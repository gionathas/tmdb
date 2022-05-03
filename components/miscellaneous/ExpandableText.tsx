import React, { useCallback, useState } from "react";

type OwnProps<T extends React.ElementType> = {
  as?: T;
  text: string;
  wordsLimit?: number;
};

type ExpandableTextProps<T extends React.ElementType> = OwnProps<T> &
  Omit<React.ComponentPropsWithRef<T>, keyof OwnProps<T>>;

const ExpandableText = <T extends React.ElementType = "p">({
  as,
  text,
  wordsLimit = 600,
  ...rest
}: ExpandableTextProps<T>) => {
  const Component = as || "p";
  const isExpandable = text.length > wordsLimit;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansions = useCallback(() => {
    setIsExpanded((isExpanded) => !isExpanded);
  }, []);

  let content = text;
  const isTextTruncated = isExpandable && !isExpanded;
  if (isTextTruncated) {
    content = text.substring(0, wordsLimit);
  }

  const btnLabel = isExpanded ? "Read Less" : "Read More";

  return (
    <Component {...rest}>
      {content}
      {isTextTruncated && "..."}
      {isExpandable && (
        <div className="flex justify-end">
          <button
            className="ml-2 text-xs hover:underline opacity-80 underline-offset-1"
            onClick={toggleExpansions}
          >
            {" "}
            {btnLabel}
          </button>
        </div>
      )}
    </Component>
  );
};

export default ExpandableText;
