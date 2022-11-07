import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne({
      where: {
        id: user_id
      },
      relations: ['games']
    })
    return user as User;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    const query = "SELECT * FROM users ORDER BY first_name ASC";
    return await this.repository.query(query);
  }
  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    const query = `
      SELECT * FROM users 
      WHERE LOWER(first_name) = LOWER($1) AND LOWER(last_name) = LOWER($2)
    `;
    return await this.repository.query(query, [first_name, last_name]);
  }
}
