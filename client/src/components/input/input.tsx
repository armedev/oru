import { useState } from "react";
import CButton from "../button/button";
import { serverAxios } from "../../utils/axios";
import {
  CertificationDataSchema,
  EducationDataSchema,
  ExperienceDataSchema,
  UserDataSchema,
} from "../../utils/dataTypes";
import "./input.scss";

interface Props {
  type: { key: string } | "certification" | "education" | "experience";
  token: string;
  setUser: React.Dispatch<React.SetStateAction<UserDataSchema | null>>;
  setModalToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
const CInput: React.FC<Props> = ({ type, token, setUser, setModalToggle }) => {
  const [simpleValue, setSimpleValue] = useState("");
  const [education, setEducation] = useState<EducationDataSchema>({
    university: "",
    course: "",
    startDate: "",
    endDate: "",
    desc: "",
  });
  const [experience, setExperience] = useState<ExperienceDataSchema>({
    pictureUrl: "d",
    type: "",
    title: "",
    startDate: "",
    endDate: "",
    company: "",
  });
  const [certification, setCertification] = useState<CertificationDataSchema>({
    title: "",
    pictureUrl: "a",
    about: "",
  });
  const handlerFunc = async (data: any) => {
    if (!(typeof Object.values(data)[0] === "string")) {
      if (
        Object.values(Object.values(data)).every((x) => x === null || x === "")
      )
        return;
    } else {
      if (Object.values(data).every((x) => x === null || x === "")) return;
    }
    try {
      const res = await serverAxios(token).post("api/update-user", data);
      if (res.status === 200) {
        setUser(res.data.data);
        setModalToggle(false);
      }
    } catch (err: any) {
      alert(err.response.data.error);
    }
  };
  if (type === "education")
    return (
      <div className="multi">
        <div>
          <label>university</label>
          <input
            type="text"
            placeholder="university name"
            onChange={(e) =>
              setEducation({ ...education, university: e.target.value })
            }
            value={education.university}
          />
        </div>
        <div>
          <label>course</label>
          <input
            type="text"
            placeholder="course name"
            onChange={(e) =>
              setEducation({ ...education, course: e.target.value })
            }
            value={education.course}
          />
        </div>
        <div>
          <label>description</label>
          <input
            type="text"
            placeholder="description"
            onChange={(e) =>
              setEducation({ ...education, desc: e.target.value })
            }
            value={education.desc}
          />
        </div>

        <div>
          <label>start Date</label>
          <input
            type="date"
            onChange={(e) =>
              setEducation({
                ...education,
                startDate: e.target.value.toString(),
              })
            }
          />
        </div>
        <div>
          <label>end Date</label>
          <input
            type="date"
            onChange={(e) =>
              setEducation({
                ...education,
                endDate: e.target.value.toString(),
              })
            }
          />
        </div>
        <CButton
          type="add"
          handlerFunc={() => handlerFunc({ educations: education })}
        />
      </div>
    );
  else if (type === "experience")
    return (
      <div className="multi">
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="role title"
            onChange={(e) =>
              setExperience({ ...experience, title: e.target.value })
            }
            value={experience.title}
          />
        </div>
        <div>
          <label>company</label>
          <input
            type="text"
            placeholder="company name"
            onChange={(e) =>
              setExperience({ ...experience, company: e.target.value })
            }
            value={experience.company}
          />
        </div>
        <div>
          <label>type</label>
          <input
            type="text"
            placeholder="type of role"
            onChange={(e) =>
              setExperience({ ...experience, type: e.target.value })
            }
            value={experience.type}
          />
        </div>

        <div>
          <label>start Date</label>
          <input
            type="date"
            onChange={(e) =>
              setExperience({
                ...experience,
                startDate: e.target.value.toString(),
              })
            }
          />
        </div>
        <div>
          <label>end Date</label>
          <input
            type="date"
            onChange={(e) =>
              setExperience({
                ...experience,
                endDate: e.target.value.toString(),
              })
            }
          />
        </div>
        <CButton
          type="add"
          handlerFunc={() => handlerFunc({ experiences: experience })}
        />
      </div>
    );
  else if (type === "certification")
    return (
      <div className="multi">
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="title of certification"
            onChange={(e) =>
              setCertification({ ...certification, title: e.target.value })
            }
            value={certification.title}
          />
        </div>
        <div>
          <label>Provider name</label>
          <input
            type="text"
            placeholder="name of certification provider"
            onChange={(e) =>
              setCertification({ ...certification, about: e.target.value })
            }
            value={certification.about}
          />
        </div>
        <CButton
          type="add"
          handlerFunc={() => handlerFunc({ certifications: certification })}
        />
      </div>
    );
  else
    return (
      <div className="simple">
        <label>{type.key}</label>
        <input
          type="text"
          placeholder="enter the value"
          value={simpleValue}
          onChange={(e) => setSimpleValue(e.target.value)}
        />
        <CButton
          type="add"
          handlerFunc={() => handlerFunc({ [type.key]: simpleValue })}
        />
      </div>
    );
};
export default CInput;
