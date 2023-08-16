import { useCallback, useEffect, useState } from "react";
import { ConnectionDataSchema } from "../../utils/dataTypes";
import { serverAxios } from "../../utils/axios";
import Card from "../../components/card/card";
import "./connections.scss";

interface Props {
  token: string;
}

const Connections: React.FC<Props> = ({ token }) => {
  const [connections, setConnections] = useState<ConnectionDataSchema[]>([]);
  const [people, setPeople] = useState<ConnectionDataSchema[]>([]);

  const fetchConnections = useCallback(async () => {
    if (!token) return;
    try {
      const res = await serverAxios(token).get("/api/connections");
      if (res.status === 200) setConnections(res.data.data);
      const resPeople = await serverAxios(token).get("/api/dummy-users");
      if (resPeople.status === 200)
        if (res.status === 200)
          setPeople(
            resPeople.data.data.filter(
              (elem: ConnectionDataSchema) =>
                !res.data.data.find(
                  ({ key }: ConnectionDataSchema) => elem.key === key
                )
            )
          );
        else setPeople(resPeople.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const fetchThings = async () => {
    await fetchConnections();
  };

  useEffect(() => {
    fetchThings();
  }, []);
  return (
    <div className="connections">
      {connections.length > 0 && (
        <div>
          <span>Connections</span>
          <div>
            {connections.map((e, idx) => (
              <Card
                user={e}
                key={idx}
                fetchThings={fetchThings}
                token={token!}
                type="connection"
              />
            ))}
          </div>
        </div>
      )}

      {people.length > 0 && (
        <div>
          <span>People you may know</span>
          <div>
            {people.map((e, idx) => (
              <Card
                user={e}
                key={idx}
                type="people"
                fetchThings={fetchThings}
                token={token}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections;
