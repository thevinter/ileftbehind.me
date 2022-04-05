import { route } from "next/dist/server/router";
import ReactAudioPlayer from "react-audio-player";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useReducer, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
export default function One() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setIdx(2), 10000);
    setTimeout(() => setIdx(3), 20000);
    setTimeout(() => setIdx(4), 30000);
    setTimeout(() => setIdx(5), 40000);
    setTimeout(() => setIdx(6), 50000);
    setTimeout(() => setIdx(7), 60000);
    setTimeout(() => setIdx(8), 70000);
  }, []);

  const [idx, setIdx] = useState(1);
  const first = (
    <div
      className={styles.fade}
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <div>REJOICE !</div>
      <div>ONCE MORE</div>
    </div>
  );
  const second = (
    <div
      className={styles.fade}
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <div>this experience was</div>
      <div>
        created in <b>72</b> hours
      </div>
    </div>
  );

  const third = (
    <div
      className={styles.fade}
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <div>by thevinter</div>
      <div>for</div>
      <div> ludum dare 50</div>
    </div>
  );

  const fourth = (
    <div
      className={styles.fade}
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <div>{"it's an act of love"}</div>
      <div>trying to leave myself</div>
      <div>behind</div>
    </div>
  );

  const fifth = (
    <div
      className={styles.fade}
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <div>Thanks to (in no particular order)</div>
      <div>Gianmix (Arriburi)</div>
      <div>Ian (verglasz)</div>
      <div>Edgar (herb_kid)</div>
    </div>
  );

  const sixth = (
    <div
      className={styles.fade}
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <div>And the rest of the fruppo</div>
      <div>and other people you</div>
      <div>{"probably don't even know"}</div>
    </div>
  );

  const seventh = (
    <div
      className={styles.fade}
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <div>Thanks</div>
    </div>
  );

  const eigth = (
    <div
      className={styles.fade}
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 180 }}>V</div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontSize: 60,
        justifyContent: "center",
      }}
    >
      <ReactAudioPlayer src="./outro.mp3" autoPlay />
      {idx === 1 && first}
      {idx === 2 && second}
      {idx === 3 && third}
      {idx === 4 && fourth}
      {idx === 5 && fifth}
      {idx === 6 && sixth}
      {idx === 7 && seventh}
      {idx === 8 && eigth}
    </div>
  );
}
