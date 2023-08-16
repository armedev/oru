import * as React from "react";
import "./auth.styles.scss";
import { serverAxios } from "../../utils/axios";
import { useNavigate } from "react-router";

interface Props {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};
type LoginInput = {
  email: string;
  password: string;
};

const Auth: React.FC<Props> = ({ token, setToken }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, []);
  const [loginInput, setLoginInput] = React.useState<LoginInput>({
    email: "",
    password: "",
  });
  const [registerInput, setregisterInput] = React.useState<RegisterInput>({
    email: "",
    password: "",
    name: "",
  });
  const [selected, setSelected] = React.useState<"login" | "register">("login");

  const handleRegisterChange = (elem: React.ChangeEvent<HTMLInputElement>) => {
    let name = elem.target.name;
    let value = elem.target.value;
    setregisterInput({ ...registerInput, [name]: value });
  };

  const handleLoginChange = (elem: React.ChangeEvent<HTMLInputElement>) => {
    let name = elem.target.name;
    let value = elem.target.value;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleLoginSubmit = async () => {
    if (loginInput.email.length < 1 || loginInput.password.length < 1) {
      alert("should not be empty");
      return;
    }
    try {
      let res = await serverAxios().post("/api/login", loginInput);
      console.log(res);
      if (res.status === 200 && res.data.data.accessToken.length > 0) {
        setToken(res.data.data.accessToken);
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response.data.error);
    }
  };

  const handleRegisterSubmit = async () => {
    if (registerInput.email.length < 1 || registerInput.password.length < 1) {
      alert("should not be empty");
      return;
    }

    try {
      let res = await serverAxios().post("/api/signup", registerInput);
      console.log(res);
      if (res.status === 200) setSelected("login");
    } catch (err: any) {
      console.error(err);
      alert(err.response.data.error);
    }
  };
  return (
    <div className="auth">
      <div className="auth__left">
        <span>Oru</span>
      </div>
      <div className="auth__right">
        <div className="auth__right__sel">
          <span
            onClick={() => setSelected("login")}
            className={selected === "login" ? "selected" : ""}
          >
            Sign In
          </span>
          <span
            onClick={() => setSelected("register")}
            className={selected === "register" ? "selected" : ""}
          >
            Sign Up
          </span>
        </div>
        {selected === "register" ? (
          <form className="auth__right__form">
            <span className="auth__right__form__name">
              <label>Name</label>
              <input
                required
                onChange={handleRegisterChange}
                name="name"
                value={registerInput.name}
                placeholder="your name"
                type="text"
              />
            </span>

            <span className="auth__right__form__email">
              <label>Email address</label>
              <input
                required
                onChange={handleRegisterChange}
                name="email"
                value={registerInput.email}
                placeholder="example@email.com"
                type="email"
              />
            </span>
            <span className="auth__right__form__pwd">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleRegisterChange}
                value={registerInput.password}
              />
            </span>
            <span
              className="auth__right__form__submit"
              onClick={handleRegisterSubmit}
            >
              Sign Up
            </span>
          </form>
        ) : (
          <form className="auth__right__form">
            <span className="auth__right__form__email">
              <label>Email address</label>
              <input
                required
                onChange={handleLoginChange}
                name="email"
                value={loginInput.email}
                placeholder="example@email.com"
                type="email"
              />
            </span>
            <span className="auth__right__form__pwd">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleLoginChange}
                value={loginInput.password}
              />
            </span>
            <span
              className="auth__right__form__submit"
              onClick={handleLoginSubmit}
            >
              Sign In
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
