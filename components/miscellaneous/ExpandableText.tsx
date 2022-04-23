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
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandable, setIsExpandable] = useState(false);

    // const calculateIsContentExpandable = useCallback(
    //   (node: HTMLElement | null) => {
    //     if (node !== null) {
    //       // console.log("Client height: ", node.clientHeight);
    //       // console.log("Scroll height: ", node.scrollHeight);

    //       const hasScrollableContent = node.scrollHeight > node.clientHeight;
    //       setIsContentExpandable(hasScrollableContent);
    //     }
    //   },
    //   []
    // );

    useEffect(() => {
      const calculateIsExpandable = () => {
        if (ref && ref.current) {
          const text = ref.current as HTMLElement;
          setIsExpandable(text.scrollHeight > text.clientHeight);
        } else {
          setIsExpandable(false);
        }
      };

      calculateIsExpandable();
      window.addEventListener("resize", calculateIsExpandable);
      return () => {
        window.removeEventListener("resize", calculateIsExpandable);
      };
    }, [isExpanded]);

    const toggleExpanded = () => {
      setIsExpanded((isExpanded) => {
        return !isExpanded;
      });
    };

    const Component = as || "p";
    const lineClamp = classNames(
      { "line-clamp-3": maxLines === 3 },
      { "line-clamp-4": maxLines === 4 },
      { "line-clamp-5": maxLines === 5 }
    );

    const classes = `${
      !isExpanded ? lineClamp : "line-clamp-none"
    } ${className}`;

    return (
      <>
        <Component ref={ref} className={classes} {...rest}>
          {children}
        </Component>
        {(isExpandable || isExpanded) && (
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
