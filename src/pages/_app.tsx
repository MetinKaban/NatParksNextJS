import React from "react";
import { useState, useEffect, useCallback } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parks, setParks] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://developer.nps.gov/api/v1/parks?limit=468&api_key=0kakgJHyPaKYnKaMNfANT9skeGsL1VtoBhZUJJda"
      );
      const data = await response.json();

      setParks(data.data);
      setIsLoading(false);
    };
    console.log("fetched");
    fetchItems();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} parks={parks} isLoading={isLoading} />
    </Layout>
  );
}
