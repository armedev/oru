import "./professional.scss";
import Image from "../../assets/professional.png";
interface Props {}
const Professional: React.FC<Props> = () => {
  return (
    <div className="professional">
      <div className="professional__left">
        <span className="professional__left__header">Professional Details</span>
        <span>
          your professional details include academics, certifications,
          experiences
        </span>
      </div>
      <img src={Image} />
    </div>
  );
};

export default Professional;
