import * as React from "react";
import { useNavigate } from "react-router";
import Sidebar from "../../components/sidebar/sidebar.component";
import "./home.styles.scss";
import Picture from "../../components/picture/picture";
import { getWindowDimensions } from "../../utils/useWindowWidth";
import Primary from "../../components/primary/primary";
import About from "../../components/about/about";
import Skills from "../../components/skills/skills";
import { serverAxios } from "../../utils/axios";
import { UserDataSchema } from "../../utils/dataTypes";
import Professional from "../../components/professional/professional";
import Certifications from "../../components/certifications/certifications";
import Experience from "../../components/experience/experience";
import Education from "../../components/education/education";
import Image from "../../assets/close.png";
import Bell from "../../assets/notification.png";
import CInput from "../../components/input/input";
import Connections from "../connections/connections";

interface Props {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export type Selected = "profile" | "connections";

const Home: React.FC<Props> = ({ token, setToken }) => {
  const navigate = useNavigate();
  const { width } = getWindowDimensions();
  const [sidebarToggle, setSidebarToggle] = React.useState<boolean>(
    !(width < 1200)
  );
  const [user, setUser] = React.useState<UserDataSchema | null>(null);
  const [modalToggle, setModalToggle] = React.useState(false);
  const [type, setType] = React.useState<
    { key: string } | "certification" | "education" | "experience"
  >({ key: "none" });

  const [selected, setSelected] = React.useState<Selected>("profile");
  React.useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        navigate("/auth");
        return;
      }
      try {
        const res = await serverAxios(token).get("/api/user");
        if (res.status === 200) setUser(res.data.data);
        console.log(res);
      } catch (err: any) {
        console.error(err.response.data.error || "error");
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="home">
      {modalToggle && (
        <div className="modal">
          <div className="modal__cont">
            <div className="modal__header">
              <span
                className="modal__header__close"
                onClick={() => setModalToggle(false)}
              >
                <img src={Image} />
              </span>

              <span>{typeof type === "string" ? type : type.key}</span>
            </div>
            <div className="modal__body">
              <CInput
                token={token!}
                type={type}
                setUser={setUser}
                setModalToggle={setModalToggle}
              />
            </div>
          </div>
        </div>
      )}
      <div className="home__sidebar">
        <Sidebar
          setToken={setToken}
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
          setSelected={setSelected}
          selected={selected}
        />
      </div>
      {user ? (
        <div
          className="home__body"
          style={
            sidebarToggle && !(width < 1200) ? { paddingLeft: "290px" } : {}
          }
        >
          <div className="home__body__header">
            <div>
              <img
                src={`https://ui-avatars.com/api/?background=2d2d2d&color=ffffff&name=${encodeURIComponent(
                  user.name || user.email
                )}`}
              />
              <span>
                <span className="subscript">Welcome Back </span>
                <span>{user.name || user.email}</span>
              </span>
            </div>
            <span>
              <img src={Bell} />
            </span>
          </div>
          <div className="home__body__cont">
            <div className="home__body__cont__head">{selected.toString()}</div>
            <div className="home__body__cont__body">
              {selected === "profile" ? (
                <>
                  <div className="home__body__cont__body__left">
                    <Picture
                      url={`https://ui-avatars.com/api/?background=2d2d2d&color=ffffff&name=${encodeURIComponent(
                        user.name || user.email
                      )}`}
                    />
                    <Primary
                      setType={setType}
                      setModalToggle={setModalToggle}
                      name={user.name}
                      email={user.email}
                      phoneNo={user.phoneNo}
                    />
                    <About
                      setType={setType}
                      setModalToggle={setModalToggle}
                      about={user.about}
                    />
                    <Skills
                      setType={setType}
                      setModalToggle={setModalToggle}
                      skills={user.skills}
                    />
                  </div>
                  <div className="home__body__cont__body__right">
                    <Professional />
                    <Certifications
                      setType={setType}
                      setModalToggle={setModalToggle}
                      certifications={user.certifications}
                    />
                    <Experience
                      setType={setType}
                      setModalToggle={setModalToggle}
                      experiences={user.experiences}
                    />
                    <Education
                      setType={setType}
                      setModalToggle={setModalToggle}
                      educations={user.educations}
                    />
                  </div>
                </>
              ) : (
                <Connections token={token!} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <span>failed to load user</span>
      )}
    </div>
  );
};

export default Home;
