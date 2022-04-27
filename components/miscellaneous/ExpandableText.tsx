import classNames from "classnames";
import { isUndefined } from "lodash";
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

type status = "expanded" | "expandable" | "unexpandable";

const ExpandableText = React.forwardRef(
  <T extends React.ElementType = "p">(
    { as, children, maxLines, className, ...rest }: ExpandableTextProps<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const [state, setState] = useState<status>("unexpandable");
    const isExpanded = state === "expanded";
    const isTogglable = state === "expandable" || state === "expanded";

    useEffect(() => {
      if (!isUndefined(window)) {
        const calculateIsExpandable = () => {
          const textContainer = ref!.current as HTMLElement;
          if (textContainer) {
            const isExpandable =
              textContainer.scrollHeight > textContainer.clientHeight;
            setState(isExpandable ? "expandable" : "unexpandable");
          }
        };

        calculateIsExpandable();
        window.addEventListener("resize", calculateIsExpandable);
        return () => {
          window.removeEventListener("resize", calculateIsExpandable);
        };
      }
    }, []);

    const toggleExpanded = () => {
      setState(isExpanded ? "expandable" : "expanded");
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
          // className={`${currentLineClamp} ${className}`}
          className={classNames(className, {
            "line-clamp-none": isExpanded,
            [`${lineClamp}`]: !isExpanded,
          })}
          {...rest}
        >
          {children}
        </Component>
        {isTogglable && (
          <span
            className="flex justify-end text-xs cursor-pointer hover:underline opacity-60 underline-offset-1"
            onClick={toggleExpanded}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </span>
        )}
      </>
    );
  }
);

ExpandableText.displayName = "ExpandableText";

export default ExpandableText;
