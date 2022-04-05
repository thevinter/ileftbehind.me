import { route } from "next/dist/server/router";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import styles from "../styles/Home.module.css";
export default function One() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => setIdx(2), 10000);
    setTimeout(() => router.push("/chat"), 20000);
  }, []);
  const cat = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
      className={styles.fade}
    >
      <Image src="/cat.jpg" height={500} width={500} />
    </div>
  );
  const [idx, setIdx] = useState(1);
  const first = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: 60,
      }}
      className={styles.fade}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{ fontWeight: "bold", fontSize: 60, marginBottom: -90 }}
          className={styles.justify}
        >
          ONCE AGAIN
        </div>
        <div>shade! (of time)</div>
      </div>
    </div>
  );
  return (
    <div>
      {idx === 1 && first}
      {idx === 2 && cat}
    </div>
  );
}
