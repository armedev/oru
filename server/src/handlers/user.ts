import { Db, ObjectId, Collection } from "mongodb";
import { CertificationDataSchema } from "./certification";
import { ExperienceDataSchema } from "./experience";
import { EducationDataSchema } from "./education";
import { ConnectionDataSchema } from "./connection";

export type UserDataSchema = {
  email: string;
  hashedPass: string;

  pictureUrl: string;

  name: string;
  phoneNo: string;
  about: string;
  skills: Array<string>;
  certifications: Array<CertificationDataSchema>;
  experiences: Array<ExperienceDataSchema>;
  educations: Array<EducationDataSchema>;
  connections: Array<ObjectId>;
};

export class UserData {
  private dbClient: Db;
  private collection: Collection<UserDataSchema>;

  constructor(dbClient: Db) {
    this.dbClient = dbClient;
    this.collection = this.dbClient.collection<UserDataSchema>("users");
  }

  async getUserByKey(key: string) {
    try {
      let objectKey = new ObjectId(key);
      let user = await this.collection.findOne({
        _id: objectKey,
      });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("failed to retrive user");
    }
  }
  async getUserByEmail(email: string) {
    try {
      let user = await this.collection.findOne({
        email: email,
      });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("failed to retrive user");
    }
  }

  async createUser(user: UserDataSchema) {
    try {
      let insertedUser = await this.collection.insertOne(user);
      return insertedUser;
    } catch (err) {
      console.error(err);
      throw new Error("failed to create user");
    }
  }

  async updateUser(user: UserDataSchema) {
    try {
      let updatedUser = await this.collection.findOneAndReplace(
        { email: user.email },
        user,
        {
          ignoreUndefined: true,
          includeResultMetadata: true,
        }
      );
      return updatedUser;
    } catch (err) {
      console.error(err);
      throw new Error("failed to updated user");
    }
  }
  async getUsers(searchValue: string) {
    try {
      let connections: Array<ConnectionDataSchema> = [];
      let user = await this.collection.find({ phoneNo: searchValue }).toArray();
      let promises = user.map(async (connection) =>
        connections.push({
          name: connection.name,
          email: connection.email,
          about: connection.about,
          key: connection._id.toString(),
        })
      );

      await Promise.all(promises);

      return connections;
    } catch (err) {
      console.error(err);
      throw new Error("failed to retrive connections");
    }
  }

  async getConnections(email: string) {
    try {
      let connections: Array<ConnectionDataSchema> = [];
      let user = await this.collection.findOne({ email: email });
      if (!user) throw new Error("failed to retrive user");
      let promises = user.connections.map(async (id) => {
        let connection = await this.collection.findOne({ _id: id });
        if (connection)
          connections.push({
            name: connection.name,
            email: connection.email,
            about: connection.about,
            key: connection._id.toString(),
          });
      });
      await Promise.all(promises);
      return connections;
    } catch (err) {
      console.error(err);
      throw new Error("failed to retrive connections");
    }
  }
}
