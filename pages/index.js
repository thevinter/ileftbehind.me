import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Introduction from "../components/Introduction";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  useEffect(() => {
    if (cookies["user"]) console.log("haha", cookies);
    else {
      fetch("/api/users", { method: "POST" })
        .then((res) => res.json())
        .then((r) => setCookie("user", r.token));
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className={styles.container}
    >
      <Introduction />
    </div>
  );
}
