export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
};

export interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  update(id: string, user: IUser): Promise<IUser | null>;
  delete(id: string): Promise<IUser | null>;
};