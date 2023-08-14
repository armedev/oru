import express from "express";
import dotenv from "dotenv";
import { connect, hashPassword, validatePassword } from "./configs";
import { UserData, UserDataSchema } from "./handlers/user";
import {
  generateAccessToken,
  generateRefreshToken,
  jwtMiddleware,
  verifyRefreshToken,
  JwtRequest,
} from "./configs/jwt";
import cookieParser from "cookie-parser";
import { ExperienceDataSchema } from "./handlers/experience";
import { CertificationDataSchema } from "./handlers/certification";
import { EducationDataSchema } from "./handlers/education";
import { connectRedis } from "./configs/redis";

//constants
const cookieAge = 2 * 24 * 60 * 60 * 1000;

dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_, res) => res.send("hello"));

app.get("/api/user", jwtMiddleware, async (req: JwtRequest, res) => {
  try {
    let payload = req.auth;
    if (!payload) return res.status(401).send({ error: "unauthorized" });

    let redisClient = await connectRedis();
    let cachedUser = await redisClient.get(payload.id);
    if (cachedUser) return res.send({ data: JSON.parse(cachedUser) });

    let db = await connect();
    let userData = new UserData(db);

    let user = await userData.getUserByKey(payload.id as string);
    if (!user) throw new Error("user not found");

    redisClient.set(user._id.toString(), JSON.stringify(user));

    return res.send({ data: user });
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
});

type SignupInput = {
  name: string;
  email: string;
  password: string;
};

app.post("/api/signup", async (req, res) => {
  try {
    const db = await connect();
    const provider = new UserData(db);
    let body: SignupInput = req.body;

    let pUser = await provider.getUserByEmail(body.email);
    if (pUser) throw new Error("email already in use");

    let { password, ...restBody } = body;
    const hashedPassword = await hashPassword(password);
    const user: UserDataSchema = {
      ...restBody,
      phoneNo: "",
      pictureUrl: "",
      about: "",
      skills: [],
      hashedPass: hashedPassword,
      certifications: [],
      experiences: [],
      educations: [],
    };

    const inserted = await provider.createUser(user);
    if (inserted.acknowledged) {
      return res.send({ key: inserted.insertedId });
    }
    throw new Error("failed to insert a user");
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
});

type LoginInput = {
  email: string;
  password: string;
};

app.post("/api/login", async (req, res) => {
  try {
    const db = await connect();
    const provider = new UserData(db);
    let body: LoginInput = req.body;

    const user = await provider.getUserByEmail(body.email);
    if (!user) throw new Error("Email not found");
    const hashedPassword = user.hashedPass;
    const isMatched = await validatePassword(body.password, hashedPassword);
    if (!isMatched) throw new Error("Password does not match");

    const accessToken = generateAccessToken({
      id: user._id.toString(),
      email: user.email,
    });
    const refreshToken = generateRefreshToken({
      id: user._id.toString(),
      email: user.email,
    });

    res
      .cookie("oru", refreshToken, {
        maxAge: cookieAge, //2 * 24 * 60 * 60 * 1000
        httpOnly: true,
      })
      .send({
        data: {
          accessToken: accessToken,
        },
      });
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
});

app.post("/api/refresh-token", async (req, res) => {
  try {
    let cookie = req.cookies["oru"];
    let payload = verifyRefreshToken(cookie);
    let accessToken = generateAccessToken({
      id: payload.id,
      email: payload.email,
    });

    res.send({
      data: {
        accessToken: accessToken,
      },
    });
  } catch (err: any) {
    console.error(err);
    return res
      .cookie("oru", "", {
        maxAge: 0,
        httpOnly: true,
      })
      .status(401)
      .send({ error: err.message });
  }
});

type UpdateUserInput = {
  name: string | null;
  phoneNo: string | null;
  about: string | null;
  skills: string | null;
  certifications: CertificationDataSchema | null;
  experiences: ExperienceDataSchema | null;
  educations: EducationDataSchema | null;
};

app.post("/api/update-user", jwtMiddleware, async (req: JwtRequest, res) => {
  try {
    let payload = req.auth;
    if (!payload) return res.status(401).send({ error: "unauthorized" });

    const db = await connect();
    const provider = new UserData(db);

    const redisClient = await connectRedis();
    let cachedUser = await redisClient.get(payload.id);
    let storedUser;
    if (cachedUser) storedUser = JSON.parse(cachedUser);
    else storedUser = await provider.getUserByEmail(payload.email);
    if (!storedUser) throw new Error("user not found");

    let updateUserInput: UpdateUserInput = req.body;

    let user: UserDataSchema = {
      email: storedUser.email,
      hashedPass: storedUser.hashedPass,
      pictureUrl: storedUser.pictureUrl,

      name: updateUserInput.name || storedUser.name,
      phoneNo: updateUserInput.phoneNo || storedUser.phoneNo,
      about: updateUserInput.about || storedUser.about,
      skills: updateUserInput.skills
        ? [...storedUser.skills, updateUserInput.skills].filter(
            (x, i, a) => a.indexOf(x) === i
          )
        : storedUser.skills,
      certifications: updateUserInput.certifications
        ? [...storedUser.certifications, updateUserInput.certifications]
        : storedUser.certifications,
      experiences: updateUserInput.experiences
        ? [...storedUser.experiences, updateUserInput.experiences]
        : storedUser.experiences,
      educations: updateUserInput.educations
        ? [...storedUser.educations, updateUserInput.educations]
        : storedUser.educations,
    };

    let updatedUserRes = await provider.updateUser(user);
    if (updatedUserRes.ok === 0) throw new Error("failed to update user!");

    let newUser = await provider.getUserByEmail(payload.email);
    if (!newUser) throw new Error("failed to get the user!");

    redisClient.set(payload.id, JSON.stringify(user));

    return res.send({ data: newUser });
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
});

app.listen(port, () => {
  console.log("app started on port ", port);
});
