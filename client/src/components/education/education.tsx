import { EducationDataSchema } from "../../utils/dataTypes";
import { dates } from "../../utils/helper";
import CButton from "../button/button";
import "./education.scss";

interface Props {
  educations: Array<EducationDataSchema>;
  setModalToggle: React.Dispatch<React.SetStateAction<boolean>>;

  setType: React.Dispatch<
    React.SetStateAction<
      { key: string } | "certification" | "education" | "experience"
    >
  >;
}

const Education: React.FC<Props> = ({
  educations,
  setType,
  setModalToggle,
}) => {
  const handlerFunc = () => {
    setType("education");
    setModalToggle(true);
  };

  return (
    <div className="education">
      <div>
        <span className="education__header">
          <span>Educations</span>
          <CButton type={"add"} handlerFunc={handlerFunc} />
        </span>
        {educations.length > 0 && (
          <span className="education__value">
            {educations.map((ed, idx) => (
              <span key={idx} className="education__value__item">
                <span className="row">{ed.university}</span>
                <span className="row">
                  <span>{dates(ed.startDate, ed.endDate)}</span>
                  <span>{ed.course}</span>
                </span>
                <span className="desc">{ed.desc}</span>
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
};

export default Education;
