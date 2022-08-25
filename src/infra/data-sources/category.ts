import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm'

import { IsNotEmpty, Length } from 'class-validator'

@Entity('category')
class CategoryDAO extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty({ message: 'Campo "Nome" não pode ser vazio!' })
  @Length(6, 255, { message: 'Campo "Nome" deve conter no mínimo 6 á 255 caracteres!' })
  name: string

  @Column('text')
  @IsNotEmpty({ message: 'Campo "Icone" não pode ser vazio!' })
  icon: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default CategoryDAO
