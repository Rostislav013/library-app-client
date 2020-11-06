import { useState, useEffect } from "react";

import api from "../api";
import { User } from "../types";

function useUser(id: string) {
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User>();

  const loadData = async () => {
    try {
      const response = await api.getUserById(id);
      setUser(response.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, error };
}

export default useUser;
