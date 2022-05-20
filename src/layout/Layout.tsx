import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <main className="grid place-items-center h-screen bg-blue-900">
      <div className="w-96 bg-white p-4">{props.children}</div>
    </main>
  );
};

export default Layout;
