import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/Layout";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
      <Component {...pageProps} setIsLoggedIn={setIsLoggedIn} />
    </Layout>
  );
}
