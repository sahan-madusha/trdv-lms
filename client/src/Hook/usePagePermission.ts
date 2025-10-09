import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthChecker } from "../Context";
import { UserRoles } from "../Constant";

export const usePagePermission = (feature: string , allowedRoles: UserRoles[] ) => {
  const {
    isAuthenticated,
    checkUserPermission,
    isLoading: authLoading,
    user
  } = useAuthChecker();
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      const allowed = isAuthenticated && checkUserPermission(feature) && allowedRoles.includes(user?.userRole);
      if (!allowed) {
        //navigate(LOGIN);
      }
      setHasPermission(allowed);
      setIsLoading(false);      
    }
  }, [authLoading, feature, isAuthenticated, checkUserPermission, navigate]);

  return { isLoading, hasPermission };
};
