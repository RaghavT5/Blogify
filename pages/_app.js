import NavBar from "../components/NavBar";
import "@/styles/globals.scss";
import { auth } from "../firebase-config";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <>
      <NavBar user={user} />
      <Component {...pageProps} user={user} />
    </>
  );
}
