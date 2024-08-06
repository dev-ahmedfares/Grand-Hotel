import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { FullPage } from "./FullPage";



function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1) Load Authenticated User
  const { isAuthenticated, isPending = false } = useUser();

  // 2) if there is no Authenticated user , redirect to login page

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, isPending, navigate]);

  // 3) While loading , Show Spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
    
  // 4) if there is a user , render App
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
