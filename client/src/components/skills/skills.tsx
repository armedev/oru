import CButton from "../button/button";
import "./skills.scss";

interface Props {
  skills: string[];
  setModalToggle: React.Dispatch<React.SetStateAction<boolean>>;

  setType: React.Dispatch<
    React.SetStateAction<
      { key: string } | "certification" | "education" | "experience"
    >
  >;
}

const Skills: React.FC<Props> = ({ skills, setModalToggle, setType }) => {
  const handlerFunc = (type: { key: string }) => {
    setType(type);
    setModalToggle(true);
  };

  return (
    <div className="skills">
      <div>
        <span className="skills__header">
          <span>Skills</span>
          <CButton
            type={skills.length > 0 ? "edit" : "add"}
            handlerFunc={() => handlerFunc({ key: "skills" })}
          />
        </span>
        {skills.length > 0 && (
          <span className="skills__value">
            {skills.map((skill, idx) => (
              <span key={idx}>{skill}</span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
};

export default Skills;
