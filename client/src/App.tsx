import { useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { serverAxios } from "./utils/axios";
import Auth from "./pages/auth/auth.component";
import Home from "./pages/home/home.component";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAccessToken = async () => {
      setLoading(true);
      if (token) return;
      try {
        let res = await serverAxios(token).post("/api/refresh-token", {});
        if (res.status === 200) setToken(res.data.data.accessToken);
        else setToken(null);
      } catch (err) {
        setToken(null);
      }
      setLoading(false);
    };

    fetchAccessToken();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <span>Loading...</span>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path={"/"}
              Component={() => <Home token={token} setToken={setToken} />}
            />
            <Route
              path={"/auth"}
              Component={() => <Auth token={token} setToken={setToken} />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
