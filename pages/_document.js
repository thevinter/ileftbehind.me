import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap"
        rel="stylesheet"
      ></link>
      <title>ileftbehind.me</title>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
