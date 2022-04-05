function getCookie(cookiename) {
  var cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
  return decodeURIComponent(
    !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
  );
}

export function Populate(s, model) {
  let final = s;
  if (s === undefined) return "";
  const res = final.match(/{(.+?)}/g);
  if (res === null) return s;
  res.forEach((match) => {
    const v = match.slice(1, -1);
    final = final.replace(
      match,
      v === "bg" ? model[v].toLowerCase() : model[v]
    );
  });
  return final;
}

export async function CheckAnswer(element, model, condition) {
  if (!model.last_message) return element.messages;
  const answer = model.last_message
    ? model.last_message
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    : "";
  console.log(" Ans", answer);

  if (condition === "yesno") {
    if (
      answer
        .split(" ")
        .some((e) =>
          [
            "yes",
            "y",
            "yeah",
            "yup",
            "yess",
            "ye",
            "yea",
            "yupp",
            "sure",
            "ok",
            "affirmative",
            "please",
            "go",
            "kk",
            "k",
          ].includes(e)
        )
    )
      return element.messages;
    else return element.messages_false;
  }
  if (condition === "name_equality") {
    if (model.name !== model.name2) return element.messages_false;
  }
  if (condition === "emotion") {
    if (!model.last_message) return element.messages;
    const r = await fetch(`/api/sentiment?word=${model.last_message}`);
    const json = await r.json();
    const s = json.score_tag;
    if (s === "NONE" || s === "NEU") return element.messages;
    if (s === "P" || s === "P+") return element.messages_p;
    if (s === "N" || s === "N+") return element.messages_n;
    return element.messages;
  }
  if (condition === "hobbies") {
    console.log(" werere", answer);

    console.log(" Ans", answer);
    if (
      answer
        .split(" ")
        .some((e) =>
          [
            "music",
            "listening",
            "albums",
            "listen",
            "spotify",
            "instrument",
            "piano",
            "guitar",
          ].includes(e)
        )
    )
      return element.messages_music;
    if (
      answer
        .split(" ")
        .some((e) =>
          [
            "films",
            "movies",
            "watching",
            "watch",
            "cinema",
            "netflix",
            "movie",
          ].includes(e)
        )
    ) {
      console.log("here", element);
      return element.messages_films;
    }
    if (
      answer
        .split(" ")
        .some((e) =>
          ["book", "read", "reading", "books", "writing", "write"].includes(e)
        )
    )
      return element.messages_books;
  }
  if (condition === "reccomendation") {
    if (
      answer
        .split(" ")
        .some((e) => ["rock", "roll", "rock'n roll", "altrock"].includes(e))
    )
      return element.messages_music_rock;
    if (
      answer.split(" ").some((e) => ["metal", "heavy", "metalcore"].includes(e))
    )
      return element.messages_music_metal;
    if (
      answer
        .split(" ")
        .some((e) =>
          [
            "electronic",
            "techno",
            "tecno",
            "house",
            "electro",
            "drumnbass",
            "drum",
            "minimal",
          ].includes(e)
        )
    )
      return element.messages_music_electronic;
    if (
      answer
        .split(" ")
        .some((e) =>
          ["classical", "mozart", "beethoven", "classic"].includes(e)
        )
    )
      return element.messages_music_classical;
    if (answer.split(" ").some((e) => ["jazz", "improv", "jazzy"].includes(e)))
      return element.messages_music_jazz;
    if (
      model.genre
        .split(" ")
        .some((e) =>
          [
            "music",
            "listening",
            "albums",
            "listen",
            "spotify",
            "instrument",
            "piano",
            "guitar",
          ].includes(e)
        )
    )
      return element.messages_music;
    if (
      model.genre
        .split(" ")
        .some((e) =>
          ["book", "read", "reading", "books", "writing", "write"].includes(e)
        )
    )
      return element.messages_books;
    if (
      model.genre
        .split(" ")
        .some((e) =>
          [
            "films",
            "movies",
            "watching",
            "watch",
            "cinema",
            "netflix",
            "movie",
          ].includes(e)
        )
    )
      return element.messages_movies;
  }
  return element.messages;
}
