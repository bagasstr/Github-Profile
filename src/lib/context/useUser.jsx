import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { debounce } from "lodash";

const userContext = createContext(null);

export function UserProvider({ children }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [userName, setUserName] = useState("");

  const fetchUser = useCallback(
    async (user) => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${user}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const results = await response.json();
        setData(results);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [data]
  );

  const timeOutFetch = useCallback(
    debounce((user) => {
      if (user) fetchUser(user);
    }, 2000),
    [fetchUser]
  );

  useEffect(() => {
    if (userName) {
      setLoading(true);
      timeOutFetch(userName);
    } else {
      setData(null);
      setError(null);
      setLoading(false);
    }
  }, [userName]);
  return (
    <userContext.Provider
      value={{ data, isLoading, isError, userName, setUserName }}>
      {children}
    </userContext.Provider>
  );
}

export function useUsers() {
  return useContext(userContext);
}
