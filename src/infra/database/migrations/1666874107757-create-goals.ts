import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class createGoals1666874107757 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'goals',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'description',
          type: 'varchar'
        },
        {
          name: 'types',
          type: 'enum',
          enum: ['receita', 'despesa']
        },
        {
          name: 'money',
          type: 'decimal',
          precision: 7,
          scale: 2
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
    }))

    await queryRunner.addColumn('goals', new TableColumn({
      name: 'userId',
      type: 'int'
    }))

    await queryRunner.createForeignKey('goals', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users')
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.includes('userId'))

    await queryRunner.dropForeignKey('users', foreignKey!)
    await queryRunner.dropColumn('users', 'userId')
    await queryRunner.dropTable('goals')
  }
}
