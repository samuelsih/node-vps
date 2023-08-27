import { users } from '@/schema/user';
import { LoginRequestType, RegisterRequestType } from './request';
import { sql } from 'drizzle-orm';
import { CreateUserResult, FindUserResult, IAuthRepo } from './types';

export default class AuthRepo implements IAuthRepo {
  constructor(private db: DB) {}

  public async createUser(
    user: RegisterRequestType
  ): Promise<CreateUserResult> {
    const result = await this.db
      .insert(users)
      .values({
        email: user.email,
        name: user.name,
        phone: user.phone,
        password: sql`crypt(${user.password}, gen_salt('bf'))`,
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        phone: users.phone,
        createdAt: users.createdAt,
      });

    return result[0];
  }

  public async findUser(data: LoginRequestType): Promise<FindUserResult> {
    const prepare = this.db
      .select({
        id: users.id,
        email: users.email,
        phone: users.phone,
        name: users.name,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(
        sql`
        ${users.email} = ${sql.placeholder('email')}
        AND
        ${users.password} = crypt(
          ${sql.placeholder('password')}, 
          ${users.password}
        )
        `
      )
      .limit(1)
      .prepare('findUser');

    const result = await prepare.execute({
      email: data.email,
      password: data.password,
    });

    return result[0];
  }
}
