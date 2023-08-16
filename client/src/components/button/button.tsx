import React from "react";
import "./button.scss";

interface Props {
  type: "add" | "edit" | "remove";
  handlerFunc: () => void;
}

const CButton: React.FC<Props> = ({ type, handlerFunc }) => {
  return (
    <button className="cbutton" onClick={handlerFunc}>
      {type}
    </button>
  );
};

export default CButton;
