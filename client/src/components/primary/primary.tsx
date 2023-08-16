import * as React from "react";
import CButton from "../button/button";
import "./primary.scss";

interface Props {
  name: string | null;
  email: string;
  phoneNo: string | null;
  setModalToggle: React.Dispatch<React.SetStateAction<boolean>>;

  setType: React.Dispatch<
    React.SetStateAction<
      { key: string } | "certification" | "education" | "experience"
    >
  >;
}

const Primary: React.FC<Props> = ({
  name,
  email,
  phoneNo,
  setModalToggle,
  setType,
}) => {
  const handlerFunc = (type: { key: string }) => {
    setType(type);
    setModalToggle(true);
  };
  return (
    <div className="primary">
      <div>
        <span className="primary__header">
          <span>Your name</span>
          {!name && (
            <CButton
              type="add"
              handlerFunc={() => handlerFunc({ key: "name" })}
            />
          )}
        </span>
        {name && (
          <span className="primary__value">
            <span>{name}</span>
            <CButton
              type="edit"
              handlerFunc={() => handlerFunc({ key: "name" })}
            />
          </span>
        )}
      </div>
      <div>
        <span className="primary__header">
          <span>email</span>
        </span>
        <span className="primary__value">
          <span>{email}</span>
        </span>
      </div>
      <div>
        <span className="primary__header">
          <span>phone number</span>
          {!phoneNo && (
            <CButton
              type="add"
              handlerFunc={() => handlerFunc({ key: "phoneNo" })}
            />
          )}
        </span>
        {phoneNo && (
          <span className="primary__value">
            <span>{phoneNo}</span>
            <CButton
              type="edit"
              handlerFunc={() => handlerFunc({ key: "phoneNo" })}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default Primary;
