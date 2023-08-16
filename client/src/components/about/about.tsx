import CButton from "../button/button";
import "./about.scss";

interface Props {
  about: string | null;
  setModalToggle: React.Dispatch<React.SetStateAction<boolean>>;

  setType: React.Dispatch<
    React.SetStateAction<
      { key: string } | "certification" | "education" | "experience"
    >
  >;
}
const About: React.FC<Props> = ({ about, setType, setModalToggle }) => {
  const handlerFunc = (type: { key: string }) => {
    setType(type);
    setModalToggle(true);
  };
  return (
    <div className="about">
      <div>
        <span className="about__header">
          <span>About</span>
          <CButton
            type={about ? "edit" : "add"}
            handlerFunc={() => handlerFunc({ key: "about" })}
          />
        </span>
        {about && (
          <span className="about__value">
            <span>{about}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default About;
