import { useAuth } from "@src/contexts/AuthProvider";
import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/sign-in", { replace: true });
    }
  }, [navigate, token]);

  return children;
}

export default ProtectedRoute;
