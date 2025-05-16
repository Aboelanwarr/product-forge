import type {  ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: 'w-full' | 'w-fit';
}

const Button = ({ children, className, width='w-full', ...rest }: IProps) => {
  return (
    <button className={` ${width} rounded-lg bg-primary hover:bg-primary/85 duration-200 font-medium text-primary-foreground p-3  ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
