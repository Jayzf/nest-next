import '@client/styles/app.scss';
import GlobalStyle from '@client/styles/globalStyle';
import { SERVICE_NAME } from '@shared/constants/config';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, ReactElement } from 'react';

const App: FC<AppProps> = (props) => {
  const { Component, pageProps } = props;
  const Layout = EmptyLayout;

  return (
    <>
      <Head>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{SERVICE_NAME}</title>
      </Head>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default App;

const EmptyLayout = ({ children }): ReactElement => <>{children}</>;
