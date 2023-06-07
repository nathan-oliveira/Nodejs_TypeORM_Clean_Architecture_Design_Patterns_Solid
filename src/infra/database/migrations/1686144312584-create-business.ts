import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class createBusiness1686144312584 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'business',
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

    await queryRunner.addColumn('business', new TableColumn({
      name: 'userId',
      type: 'int'
    }))

    await queryRunner.createForeignKey('business', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }))

    await queryRunner.addColumn('business', new TableColumn({
      name: 'categoryId',
      type: 'int'
    }))

    await queryRunner.createForeignKey('business', new TableForeignKey({
      columnNames: ['categoryId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'category',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const tableUsers = await queryRunner.getTable('users')
    const tableCategory = await queryRunner.getTable('category')

    const foreignKeyUsers = tableUsers!.foreignKeys.find(fk => fk.columnNames.includes('userId'))
    const foreignKeyCategory = tableCategory!.foreignKeys.find(fk => fk.columnNames.includes('categoryId'))

    await queryRunner.dropForeignKey('users', foreignKeyUsers!)
    await queryRunner.dropForeignKey('category', foreignKeyCategory!)
    await queryRunner.dropColumn('users', 'userId')
    await queryRunner.dropColumn('category', 'categoryId')
    await queryRunner.dropTable('business')
  }
}
