import { postAuthUser } from "@/services/AuthService";
import { useLogger } from "@/hooks/useLogger";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AuthLayout({ role }) {
  const [isAuthorize, setIsAuthorize] = useState(null); 
  const navigate = useNavigate();
  const log = useLogger("AuthLayout");

  log.info("called");

  useEffect(() => {
    async function getAuthorize() {
      try {
        const res = await postAuthUser({ expected: role });
        setIsAuthorize(res.success);
      } catch (e) {
        log.error("auth failed:", e);
        setIsAuthorize(false);
      }
    }

    if (role !== "visitor") {
      getAuthorize();
    } else {
      setIsAuthorize(true);
    }
  }, [role]);

  useEffect(() => {
    if (isAuthorize === false) {
      navigate("/error");
    }
  }, [isAuthorize, navigate]);


  if (isAuthorize === null) {
    return <div>Checking authorization...</div>; 
  }

  return <Outlet />;
}

export default AuthLayout;

