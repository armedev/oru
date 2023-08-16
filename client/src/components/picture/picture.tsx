import "./picture.scss";
interface Props {
  url: string;
}
const Picture: React.FC<Props> = ({ url }) => {
  return (
    <>
      <img src={url} alt="profile" className="picture" />
    </>
  );
};

export default Picture;
