import Menu from "@components/domain/Menu";

const DefaultTemplate = ({ children }) => {
  return (
    <div>
      <Menu></Menu>
      <main>{children}</main>
    </div>
  );
};

export default DefaultTemplate;
