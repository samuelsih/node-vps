import { LoginRequestType, RegisterRequestType } from './request';

export interface IAuthRepo {
  createUser: (user: RegisterRequestType) => Promise<CreateUserResult>;
  findUser: (data: LoginRequestType) => Promise<FindUserResult>;
}

export type CreateUserResult = {
  id: number;
  email: string;
  name: string;
  phone: string | null;
  createdAt: Date;
};

export type FindUserResult = {
  id: number;
  email: string;
  name: string;
  phone: string | null;
  createdAt: Date;
};
