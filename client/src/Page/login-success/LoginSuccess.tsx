import { useEffect } from "react";
import { LoadingScreen } from "../../components";
import { useNavigate } from "react-router-dom";
import { useAuthChecker } from "../../Context";
import { DASHBOARD, LOGIN } from "../../Constant";

export const LogingSuccessPage = () => {
  const { user, isAuthenticated , navigationPath } = useAuthChecker();
  const navigate = useNavigate();
  const messageQueue = [
    { message: "Waiting...", duration: 900 },
    { message: "Your app is setting up...", duration: 1100 },
    { message: "Almost there... Just a moment!", duration: 1500 },
    { message: "Here we go.....", duration: 500 },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate(`../${navigationPath}/${DASHBOARD}`);
      }, 4100);
    } else {
      navigate(LOGIN);
    }
  }, [user, isAuthenticated]);

  return (
    <>
      <LoadingScreen messageQueue={messageQueue} />
    </>
  );
};
