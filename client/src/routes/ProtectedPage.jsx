import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProtectedPage({
  children,
  guestOnly = false,
  needLogin = false,
}) {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();

  // console.log(userSelector.handphone);
  console.log("needlogin: " + needLogin);
  console.log("guestOnly: " + guestOnly);

  useEffect(() => {
    if (guestOnly && userSelector?.handphone) {
      // jika guestonly false dan user phone ada
      return nav("/home"); // maka go home
    } else if (needLogin && !userSelector?.handphone) {
      //jika needlogin false dan ga ada user phone gaada
      return nav("/login"); //maka go login
    }
  }, [userSelector, needLogin]);

  return (
    <>
      {/* {needLogin ? (
    <>
     <Navbar />
     {children}
     <Footer />
    </>
   ) : (
    <>
     <Navbar />
     {children}
     {userSelector.id ? <Footer /> : null}
    </>
   )} */}

      <Navbar />
      {children}
      <Footer />
    </>
  );
}
