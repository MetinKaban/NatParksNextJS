import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/Layout";
import { useState, useEffect, useCallback } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [parks, setParks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&limit=200&q=%22national%20park%22&api_key=0kakgJHyPaKYnKaMNfANT9skeGsL1VtoBhZUJJda"
      );
      const data = await response.json();

      setParks(data.data);
      setIsLoading(false);
    };
    console.log("fetched");
    fetchItems();
  }, []);

  return (
    <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
      <Component
        {...pageProps}
        setIsLoggedIn={setIsLoggedIn}
        parks={parks}
        isLoading={isLoading}
      />
    </Layout>
  );
}
