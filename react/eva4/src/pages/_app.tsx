import "@/styles/globals.css";
import "@/styles/login.css";
import "@/styles/registrar.css";
import "@/styles/tabla.css";
import type { AppProps } from "next/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
