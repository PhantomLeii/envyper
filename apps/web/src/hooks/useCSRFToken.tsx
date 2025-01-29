import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function useCSRFToken() {
  const [csrfToken, setCSRFToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = Cookies.get("csrftoken");
    setCSRFToken(token);
  }, []);

  return csrfToken;
}
