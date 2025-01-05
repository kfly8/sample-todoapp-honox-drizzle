import { expect, test, describe } from "bun:test";
import { drizzle } from 'drizzle-orm/libsql';
import { ok } from 'neverthrow';

import { UserRepository } from './UserRepository';

const createUserRepository = () => {
  const db = drizzle(process.env.DATABASE_URL!)
  const userRepo = new UserRepository(db);
  return userRepo;
}

describe('createUser', async () => {
  const userRepo = createUserRepository();

  test('Create a user', async () => {
    const userResult = await userRepo.createUser({
      name: 'John Doe',
    });

    expect(userResult).toEqual(ok(expect.objectContaining({
      name: 'John Doe',
    })));
  });
});

