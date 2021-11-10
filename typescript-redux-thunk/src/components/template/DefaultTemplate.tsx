import Menu from "@components/domain/Menu";
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const DefaultTemplate = ({ children }: Props) => {
  return (
    <div>
      <Menu></Menu>
      <main>{children}</main>
    </div>
  );
};

export default DefaultTemplate;
