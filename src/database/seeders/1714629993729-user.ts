import { GlobalHelper } from '../../helpers/global.helper';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
export class User1714629993729 implements MigrationInterface {
  private globalHelper = new GlobalHelper();

  public async up(queryRunner: QueryRunner): Promise<void> {
    const data = [];
    for (let index = 0; index < 50; index++) {
      const firstName = faker.person.firstName().replace("'", '');
      const lastName = faker.person.lastName().replace("'", '');
      const email = faker.internet.exampleEmail({ firstName, lastName });
      const phone = faker.phone.number();
      const position = faker.person.jobTitle();
      data.push({ firstName, lastName, email, phone, position });
      await queryRunner.query(
        `INSERT INTO users(first_name, last_name, email, phone, position) VALUES ('${firstName}','${lastName}','${email}','${phone}','${position}')`,
      );
      // console.log('data:', { firstName, lastName, email, phone, position });
    }
    // console.log('data:', data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
