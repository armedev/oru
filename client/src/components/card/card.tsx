import { serverAxios } from "../../utils/axios";
import { ConnectionDataSchema } from "../../utils/dataTypes";
import CButton from "../button/button";
import "./card.scss";

interface Props {
  user: ConnectionDataSchema;
  token: string;
  type: "connection" | "people";
  fetchThings: () => {};
}
const Card: React.FC<Props> = ({ token, user, type, fetchThings }) => {
  const addConnection = async (key: string) => {
    try {
      const res = await serverAxios(token).post("/api/update-user", {
        connections: key,
      });
      if (res.status === 200) fetchThings();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="card">
      <div>
        <span className="title">{user.name}</span>
        <span>{user.email}</span>
        <span>{user.about}</span>
        {type === "people" && (
          <CButton type="add" handlerFunc={() => addConnection(user.key)} />
        )}
      </div>
      <img
        src={`https://ui-avatars.com/api/?background=2d2d2d&color=ffffff&name=${encodeURIComponent(
          user.name || user.email
        )}`}
      />
    </div>
  );
};

export default Card;
