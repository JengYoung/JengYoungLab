interface HeaderProps {
  children: string;
  level?: number
  strong?: boolean;
  underline?: boolean;
  color?: string;
  [index: string]: any;
}
const Header: React.FC<HeaderProps> = ({
  children,
  level = 1,
  strong,
  underline,
  color,
  ...props
}) => {
  let Tag = `h${level}` as keyof JSX.IntrinsicElements;
  if (level < 1 || level > 6) {
    console.warn("Header only accept `1 | 2 | 3 | 4 | 5 | 6 |` as level");
  }
  const fontStyle = {
    fontWeight: strong ? "bold" : "normal",
    textDecoration: underline ? "underline" : undefined,
    color,
  };
  return (
    <Tag style={{ ...props.style, ...fontStyle }} {...props}>
      {children}
    </Tag>
  );
};

export default Header;
