import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUsers1623154264696 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            length: '255',
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
            isNullable: false
          },
          {
            name: 'level',
            type: 'int',
            default: 0,
            isNullable: false
          },
          {
            name: 'photo',
            type: 'text',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
