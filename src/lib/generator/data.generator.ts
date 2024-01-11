import { faker } from '@faker-js/faker';
import { writeFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import { User } from 'src/app/user/user.entity';

export const generateUsers = () =>
  new Promise<User>((resolve, reject) => {
    const user: User = {
      _id: faker.string.uuid(),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      age: faker.number.int({ min: 12, max: 40 }),
      balanceIn: Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, __) => faker.number.int({ min: 10, max: 9000 }),
      ),
    };

    resolve(user);
  });

export const generate = async (count: number = 1000000) => {
  const init = Array.from({ length: count }, (_, index) => index + 1);

  const datas = await Promise.all(init.map((i) => generateUsers()));

  writeFileSync('users.json', JSON.stringify(datas, null, 2));
};

console.log(
  generate().then(() => {
    console.log('File generated');
  }),
);
