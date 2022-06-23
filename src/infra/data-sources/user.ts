import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm'

import { IsNotEmpty, IsEmail, Length } from 'class-validator'

@Entity('users')
class UserDAO extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(6, 255, { message: 'Campo "Nome" deve conter no mínimo 6 á 255 caracteres!' })
  name: string

  @Column({ unique: true })
  @IsEmail({}, { message: 'Campo "E-mail" inválido!' })
  email: string

  @Column()
  @Length(6, 220, { message: 'Campo "Senha" deve conter no mínimo 6 á 200 caracteres!' })
  password: string

  @Column({ default: true })
  active: boolean

  @Column('text')
  @IsNotEmpty({ message: 'Campo "photo" não pode ser vazio!' })
  photo: string

  @Column({ default: 0 })
  level: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default UserDAO
