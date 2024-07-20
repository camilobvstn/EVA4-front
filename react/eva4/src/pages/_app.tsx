import "@/styles/globals.css";
import "@/styles/login.css";
import "@/styles/registrar.css";
import "@/styles/tabla.css";
import type { AppProps } from "next/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
