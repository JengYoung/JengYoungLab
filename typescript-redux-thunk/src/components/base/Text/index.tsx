import React from "react";
import "./Text.css";

interface TextProps {
  children: string | React.ReactNode;
  block?: boolean;
  paragraph?: boolean;
  size?: string;
  strong?: boolean;
  underline?: boolean;
  color?: string;
  mark?: boolean;
  code?: boolean;
  del?: boolean;
  [index: string]: any;
}

const Text: React.FC<TextProps> = ({
  children,
  block,
  paragraph,
  size,
  strong,
  underline,
  color,
  mark,
  code,
  del,
  ...props
}) => {
  const Tag = block ? "div" : paragraph ? "p" : "span";

  const fontStyle = {
    fontWeight: strong ? "bold" : undefined,
    fontSize: typeof size === "number" ? size : undefined,
    textDecoration: underline ? "underline" : undefined,
    color,
  };
  if (del) {
    children = <del>{children}</del>;
  }
  if (code) {
    children = <code>{children}</code>;
  }
  if (mark) {
    children = <mark>{children}</mark>;
  }
  return (
    <Tag
      className={`${typeof size === "string" ? `Text--size-${size}` : undefined}`}
      style={{ ...props.style, ...fontStyle }}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Text;
