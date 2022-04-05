import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GoChevronRight } from "react-icons/go";
import styles from "./Introduction.module.css";

export default function Introduction() {
  const [hover, setHover] = useState(false);

  const one = (
    <div>
      <div>one must remember</div>
      <div style={{ display: "flex" }}>
        <div>that one is one</div>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={styles.chevron}
          onClick={() => start()}
          style={{
            display: "flex",
            alignItems: "flex-end",
            backgroundColor: hover ? "black" : "white",
            justifyContent: "flex-end",
            paddingBottom: 4,
            flex: 1,
          }}
        >
          <GoChevronRight
            size={hover ? 60 : 55}
            color={hover ? "white" : "black"}
          />
        </div>
      </div>
    </div>
  );

  const router = useRouter();

  const two = (
    <div
      className={styles.fade}
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <div>this game is best</div>
      <div>played with sound</div>
    </div>
  );

  const three = (
    <div
      className={styles.fade}
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <div>this game is best</div>
      <div>played on a pc resolution</div>
    </div>
  );

  const four = (
    <div
      className={styles.fade}
      style={{
        position: "absolute",
        fontSize: 30,
        fontStyle: "italic",
        top: 50,
        left: 50,
      }}
    >
      this is not for you.
    </div>
  );

  const messages = [one, two, three, four];
  const [idx, setIdx] = useState(0);

  const start = () => {
    const a = new Audio("./intro.mp3");
    a.play();
    setIdx(1);
    setTimeout(() => setIdx(2), 10000);
    setTimeout(() => setIdx(3), 20000);
    setTimeout(() => router.push("/1"), 30000);
  };

  return (
    <div style={{ fontSize: 60 }}>
      {idx === 0 && one}
      {idx === 1 && two}
      {idx === 2 && three}
      {idx === 3 && four}
    </div>
  );
}
