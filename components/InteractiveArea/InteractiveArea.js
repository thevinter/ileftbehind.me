import styles from "./InteractiveArea.module.css";
import Typewriter from "typewriter-effect";
import { CheckAnswer, Populate } from "../../helperService";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function InteractiveArea({
  element,
  progress,
  audio,
  submit,
  submit_value,
  model,
  setImage,
  setBackground,
}) {
  const [text, setText] = useState("");
  const [load, setLoad] = useState(true);
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (element.action) {
      if (element.action === "changeBackground") {
        let bg = "";
        if (model.bg === "Forests") bg = "./forest.gif";
        if (model.bg === "Sea") bg = "./sea.gif";
        if (model.bg === "Mountains") bg = "./mountains.gif";
        setBackground(bg);
      }

      if (element.action === "nextChapter") {
        advance();
      }
    }
    if (element.setbg) setBackground(element.setbg);
    CheckAnswer(element, model, element.condition).then((r) => setMessages(r));
  }, [element, model]);

  console.log("model", model);

  const escFunction = async (event) => {
    if (load) return;
    const pressed = event.key;
    if (pressed === "Backspace") {
      setText((t) => t.slice(0, -1));
    }
    if (pressed === "Enter" && text.length > 0) {
      if (element.type == "end") {
        router.push("/end");
      }
      if (element.type === "variable") {
        try {
          await submit(element.var_name, text);
        } catch (e) {
          console.log(e);
        }
        console.log("aaaa");
      }
      if (element.action === "draw") {
        console.log("IMG");
        const r = await fetch(
          `/api/image?word=${
            text.split(" ").sort((a, b) => b.length - a.length)[0]
          }`
        );
        const a = await r.json();
        setImage(a.output_url);
        console.log("img output", a);
      }
      if (element.action === "checkEnd") {
        const answer = model.last_message.toLowerCase();
        if (
          answer
            .split(" ")
            .some((e) =>
              [
                "nop",
                "nope",
                "nah",
                "no",
                "n",
                "never",
                "won't",
                "nopp",
                "nay",
                "noo",
                "no",
              ].includes(e)
            )
        ) {
          await submit("end_game", true);
        }
      }
      await submit("last_message", text);
      setText("");

      await submit("current_element", parseInt(model.current_element) + 1);
    }
    if (/^[a-zA-Z?!+-.,"' ]$/i.test(event.key)) {
      setText((text) => `${text}${pressed}`);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => document.removeEventListener("keydown", escFunction);
  }, [load, text]);

  console.log("Current Element", element);
  if (messages.length === 0) return <></>;

  return (
    <div style={{ zIndex: 3, fontSize: 50, padding: 100 }}>
      <Typewriter
        onInit={(typewriter) => {
          typewriter.callFunction(() => setLoad(true));
          typewriter.callFunction(() => {
            audio.current.play();
            audio.current.loop = true;
          });
          typewriter.changeDelay(100),
            messages.slice(0, messages.length - 1).forEach((message) => {
              typewriter
                .typeString(Populate(message, model))
                .pauseFor(1000)
                .changeDeleteSpeed(100)
                .deleteAll();
            });
          typewriter
            .typeString(Populate(messages[messages.length - 1], model))
            .pauseFor(1000)
            .callFunction(() => setLoad(false))
            .callFunction(() => {
              audio.current.pause();
              audio.current.currentTime = 0;
            })
            .start();
        }}
      />
      {!load && (
        <div style={{ color: "#726084" }}>
          {element.type === "choice" ? (
            <MultiSelector
              submit={submit_value}
              k={element.var_name}
              choices={element.choices}
            />
          ) : (
            `> ${text}`
          )}
        </div>
      )}
    </div>
  );
}

const MultiSelector = ({ choices, submit, k }) => {
  const selectors = choices.map((c, i) => (
    <div onClick={() => submit(k, c)} key={i}>{`> ${c}`}</div>
  ));
  return <div>{selectors}</div>;
};
