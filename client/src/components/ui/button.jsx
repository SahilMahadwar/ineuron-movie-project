import { cva } from "class-variance-authority";
import clsx from "clsx";

import Icon from "./icon";
import Spinner from "./spinner";

const buttonStyles = cva(
  "duration-0.15 transition ease-in rounded-lg text-center focus:outline-none focus:ring-4 font-medium select-none relative inline-flex items-center",
  {
    variants: {
      intent: {
        primary:
          "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-300",

        secondary:
          "border border-gray-800 hover:bg-gray-700 focus:ring-gray-200 bg-gray-800",

        active:
          "bg-brand-50 text-brand-600 hover:bg-brand-100 focus:ring-brand-300 border border-brand-200",
      },
      disabledIntents: {
        primary:
          "bg-brand-500 hover:bg-brand-500  text-white cursor-not-allowed",
        secondary: "border border-gray-800  focus:ring-gray-200 bg-gray-800",
        active:
          "bg-brand-50 text-brand-600 hover:bg-brand-50  border border-brand-100 cursor-not-allowed",
      },
      size: {
        xs: "px-3 py-2 text-xs",
        sm: "px-3 py-2 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
        xl: "px-6 py-3.5 text-base",
      },
      fullWidth: { true: "w-full" },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

const Button = ({
  children,
  intent = "primary",
  size = "md",
  isLoading,
  isDisabled,
  fullWidth,
  loadingText,
  spinnerPlacement = "left",
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <button
      className={buttonStyles({
        intent,
        disabledIntents: isLoading || isDisabled ? intent : null,
        fullWidth,
        size,
      })}
      {...props}
      disabled={isLoading || isDisabled ? true : false}
    >
      {leftIcon && (
        <span
          className={clsx(
            "mr-2 -ml-0.5",
            isLoading && !loadingText && "invisible",
            isLoading && loadingText && "hidden"
          )}
        >
          <Icon size={size}>{leftIcon}</Icon>
        </span>
      )}

      <span
        className={clsx(
          "w-full font-body",
          isLoading && !loadingText && "invisible",
          isLoading && loadingText && "hidden"
        )}
      >
        {children}
      </span>

      {rightIcon && (
        <span
          className={clsx(
            "-mr-0.5 ml-2",
            isLoading && !loadingText && "invisible",
            isLoading && loadingText && "hidden"
          )}
        >
          <Icon size={size}>{rightIcon}</Icon>
        </span>
      )}

      {spinnerPlacement === "left" && loadingText && isLoading && (
        <span className="mr-2 -ml-0.5 flex flex-col">
          <Spinner color={intent} size={size} />
        </span>
      )}

      {loadingText && isLoading && <p>{loadingText}</p>}
      {spinnerPlacement === "right" && loadingText && isLoading && (
        <span className=" -mr-0.5  ml-2 flex flex-col">
          <Spinner color={intent} size={size} />
        </span>
      )}

      {isLoading && !loadingText && (
        <span className="absolute left-0 bottom-0 top-0  right-0  flex  flex-col items-center justify-center">
          <Spinner color={intent} size={size} />
        </span>
      )}
    </button>
  );
};

export default Button;
