import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/api";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);
  useEffect(() => {
    // alert("hello");
    fetch();
  }, []);

  async function fetch() {
    try {
      const token = JSON.parse(localStorage.getItem("user"));
      console.log(token);
      const user = await api
        .get("/users/v3", {
          params: {
            token,
            id: userSelector.id,
          },
        })
        .then((res) => res.data);
      if (user?.handphone) {
        dispatch({
          type: "login",
          payload: user,
        });
      }

      // console.log(user.data);
    } catch (err) {
      console.log(err);
    }
  }

  return children;
}
