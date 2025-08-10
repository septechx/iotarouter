import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { useNavigate } from "./router";

export function Link({
  to,
  children,
  ...props
}: {
  to: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const navigate = useNavigate();

  const preventReload = (event: any) => {
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={preventReload} {...props}>
      {children}
    </a>
  );
}
