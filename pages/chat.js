import { useCookies } from "react-cookie";
import cookies from "next-cookies";
import InteractiveArea from "../components/InteractiveArea/InteractiveArea";
import Image from "next/image";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import PropsDisplay from "../components/PropsDisplay/PropsDisplay";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Chat({ user }) {
  const { data } = useSWR(`/api/users/${user}/chapter`, fetcher);
  const [currentElement, setCurrentElement] = useState(1);
  const [model, setModel] = useState({});
  const [returning, setReturning] = useState(false);
  const [image, setImage] = useState(null);
  const router = useRouter();

  const [background, setBackground] = useState("");

  const a = useRef(null);
  useEffect(() => {
    if (a.current === null || a.current === undefined) {
      console.log("changing current");
      a.current =
        typeof Audio === "undefined" ? null : new Audio("./keyboard.mp3");
      a.current.volume = 0.3;
    }
  }, []);

  useEffect(() => {
    fetch(`/api/users/${user}`)
      .then((res) => res.json())
      .then((res) => setModel(res));
  }, [user]);

  useEffect(() => {
    console.log("model", model);
    if (model.bg) {
      let bg = "";
      if (model.bg === "Forests") bg = "./forest.gif";
      if (model.bg === "Sea") bg = "./sea.gif";
      if (model.bg === "Mountains") bg = "./mountains.gif";
      setBackground(bg);
    }
    setCurrentElement(parseInt(model.current_element));
  }, [model]);

  console.log(currentElement);

  useEffect(() => {
    if (image !== null) setTimeout(() => setImage(null), 15000);
  }, [image]);

  if (!data) return <></>;

  const submit = async (key, value) => {
    const response = await fetch(
      `/api/users/${user}?key=${key}&value=${value}`,
      {
        method: "POST",
      }
    );
    const m = await response.json();
    setModel(m);
    if (key === "end_game") router.push("/");
    setReturning(false);
    if (key === "current_element") {
      setCurrentElement(value);
    }
    console.log("ending?");
  };

  const submit_value = async (key, value) => {
    const response = await fetch(
      `/api/users/${user}?key=${key}&value=${value}`,
      {
        method: "POST",
      }
    );
    const m = await response.json();
    await submit("current_element", parseInt(m.current_element) + 1);
    console.log("setting", key, value, m);
    console.log("ending?");
  };

  const chapter_boxes = data.elements.map((element, idx) => (
    <InteractiveArea
      key={idx}
      audio={a}
      submit={submit}
      element={element}
      submit_value={submit_value}
      setBackground={setBackground}
      setImage={setImage}
      progress={setCurrentElement}
      model={model}
    />
  ));

  const dummy_element = {
    chapter: -1,
    number: -1,
    messages: [
      `Welcome back ${model.name}`,
      "I was scared you left me there for a second...",
    ],
    type: "void",
  };

  const dummy_area = (
    <InteractiveArea
      submit={submit}
      submit_value={submit_value}
      audio={a}
      element={dummy_element}
      setBackground={setBackground}
      progress={setCurrentElement}
      model={model}
    />
  );
  console.log(currentElement);
  const prop = data.elements[currentElement - 1]
    ? data.elements[currentElement - 1].props || null
    : null;

  console.log(returning);

  return (
    <div
      style={{
        display: "flex",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundImage: `url(.${background})`,
      }}
    >
      <div style={{ flex: 7 }}>
        {returning ? dummy_area : chapter_boxes[currentElement - 1]}
      </div>
      <div style={{ flex: 3 }}>
        <PropsDisplay prop={prop} />
      </div>
      {image && (
        <div
          style={{
            width: 500,
            width: 500,
            position: "absolute",
            bottom: 30,
            right: 30,
          }}
        >
          <Image src={image} height={500} width={500} />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const user = cookies(context);
  if (!user.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: { user: user.user } };
}
