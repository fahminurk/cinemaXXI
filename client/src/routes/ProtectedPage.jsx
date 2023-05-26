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

  console.log(userSelector.handphone);
  console.log(needLogin);

  useEffect(() => {
    if (guestOnly && userSelector?.handphone) {
      return nav("/home");
    } else if (needLogin && !userSelector?.handphone) {
      return nav("/login");
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
