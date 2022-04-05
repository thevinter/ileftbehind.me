import styles from "./PropsDisplay.module.css";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function PropsDisplay({ prop }) {
  const audio = useRef(null);
  useEffect(() => {
    if (prop && prop.type == "music") {
      const a =
        typeof Audio !== "undefined" ? new Audio(`.${prop.url}`) : undefined;
      a.play();
      audio.current = a;
    }
  }, [prop]);

  if (!prop) return <></>;

  if (prop.type === "music") {
    return <></>;
  }

  if (
    (prop.type === "image" && prop.url === "/her.gif") ||
    prop.url === "/gpt.png"
  )
    return (
      <div
        style={{
          paddingRight: 0,
          display: "flex",
          height: "100vh",
          alignItems: "flex-end",
        }}
      >
        <div
          className={styles.ai}
          style={{ width: 1024, height: 1024, marginBottom: -10 }}
        >
          <Image src={prop.url} height={1024} width={1024} />
        </div>
      </div>
    );
}
