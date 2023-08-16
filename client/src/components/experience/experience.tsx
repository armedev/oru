import { ExperienceDataSchema } from "../../utils/dataTypes";
import CButton from "../button/button";
import Image from "../../assets/oru.png";
import "./experience.scss";
import { dates } from "../../utils/helper";

interface Props {
  experiences: Array<ExperienceDataSchema>;
  setModalToggle: React.Dispatch<React.SetStateAction<boolean>>;

  setType: React.Dispatch<
    React.SetStateAction<
      { key: string } | "certification" | "education" | "experience"
    >
  >;
}
const Experience: React.FC<Props> = ({
  experiences,
  setType,
  setModalToggle,
}) => {
  const handlerFunc = () => {
    setType("experience");
    setModalToggle(true);
  };

  return (
    <div className="experience">
      <div>
        <span className="experience__header">
          <span>Experiences</span>
          <CButton type={"add"} handlerFunc={handlerFunc} />
        </span>
        {experiences.length > 0 && (
          <span className="experience__value">
            {experiences.map((exp, idx) => (
              <span key={idx} className="experience__value__item">
                <span>
                  <span className="row">
                    <span>{dates(exp.startDate, exp.endDate)}</span>
                    <span>{exp.type}</span>
                  </span>
                  <span className="row">
                    <span>{exp.company}</span>
                    <span className="title">{exp.title}</span>
                  </span>
                </span>
                <img src={Image} />
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
};

export default Experience;
