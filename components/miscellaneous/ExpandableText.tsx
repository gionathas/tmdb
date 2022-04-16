import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "../../@types/utils";

type Props = {
  children: React.ReactNode;
  maxLines: 3 | 4 | 5;
};

type ExpandableTextProps<T extends React.ElementType> =
  PolymorphicComponentPropsWithRef<T, Props>;

const ExpandableText = React.forwardRef(
  <T extends React.ElementType = "p">(
    { as, children, maxLines, className, ...rest }: ExpandableTextProps<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const [isContentExpanded, setIsContentExpanded] = useState(false);
    const [isContentExpandable, setIsContentExpandable] = useState(false);

    useEffect(() => {
      const calculateIsContentExpandable = (): boolean => {
        if (ref && ref.current) {
          return ref.current?.scrollHeight > ref.current?.clientHeight;
        }

        return false;
      };
      setIsContentExpandable(calculateIsContentExpandable());
    }, [ref]);

    const toggleContentExpansion = () => {
      setIsContentExpanded(!isContentExpanded);
    };

    const Component = as || "p";
    const lineClamp = classNames(
      { "line-clamp-3": maxLines === 3 },
      { "line-clamp-4": maxLines === 4 },
      { "line-clamp-5": maxLines === 5 }
    );

    return (
      <>
        <Component
          ref={ref}
          className={`${className} ${lineClamp} ${
            isContentExpanded && "line-clamp-none"
          }`}
          {...rest}
        >
          {children}
        </Component>
        {isContentExpandable && (
          <span
            className="flex justify-end text-xs cursor-pointer hover:underline opacity-60 underline-offset-1"
            onClick={toggleContentExpansion}
          >
            {isContentExpanded ? "Read Less" : "Read More"}
          </span>
        )}
      </>
    );
  }
);

ExpandableText.displayName = "ExpandableText";

export default ExpandableText;
