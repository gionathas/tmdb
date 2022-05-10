import React from "react";
type Props = React.ComponentPropsWithRef<"button">;

const SignInButton = ({ className, ...rest }: Props) => {
  return (
    <button
      aria-label={`sign-in`}
      className={`py-2 text-xs tracking-wide uppercase md:block btn btn-primary px-9 ${className}`}
      {...rest}
    >
      Sign In
    </button>
  );
};

export default SignInButton;
