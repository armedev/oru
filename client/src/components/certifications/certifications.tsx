import { CertificationDataSchema } from "../../utils/dataTypes";
import CButton from "../button/button";
import "./certifications.scss";
import Image from "../../assets/certifications.png";

interface Props {
  certifications: Array<CertificationDataSchema>;
  setModalToggle: React.Dispatch<React.SetStateAction<boolean>>;

  setType: React.Dispatch<
    React.SetStateAction<
      { key: string } | "certification" | "education" | "experience"
    >
  >;
}
const Certifications: React.FC<Props> = ({
  certifications,
  setType,
  setModalToggle,
}) => {
  const handlerFunc = () => {
    setType("certification");
    setModalToggle(true);
  };

  return (
    <div className="certifications">
      <div>
        <span className="certifications__header">
          <span>Certifications</span>
          <CButton type={"add"} handlerFunc={handlerFunc} />
        </span>
        {certifications.length > 0 && (
          <span className="certifications__value">
            {certifications.map((cert, idx) => (
              <span key={idx} className="certifications__value__item">
                <img src={Image} />
                <span>
                  <span className="title">{cert.title}</span>
                  <span>{cert.about}</span>
                </span>
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
};

export default Certifications;
