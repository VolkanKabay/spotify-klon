import { useEffect } from "react";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";

const useUserInfoEffect = (token: unknown) => {
  const [, dispatch] = useStateProvider();  

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        });

        const userInfoData = {
          userId: data.id,
          userName: data.display_name,
          userImage: data.images[0].url,
        };

        dispatch({ type: reducerCases.SET_USER, userInfo: userInfoData });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    getUserInfo();
  }, [token, dispatch]);
};

export default useUserInfoEffect;
