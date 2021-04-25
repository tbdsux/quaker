import { ReactNode } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="antialiased">{children}</main>
    </div>
  );
};

export default Layout;
