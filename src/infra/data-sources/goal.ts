import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import { IsNotEmpty, IsEnum } from 'class-validator'

import { UserDAO } from './user'

@Entity('goals')
export class GoalDAO extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty({ message: 'Descrição não pode ser vazio!' })
  description: string

  @Column({
    type: 'enum',
    enum: ['receita', 'despesa']
  })
  @IsEnum(['receita', 'despesa'], { message: 'Tipo inválido!' })
  types: string

  @Column('decimal', { precision: 7, scale: 2 })
  @IsNotEmpty({ message: 'Valor não pode ser vazio!' })
  money: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToMany((type: any) => UserDAO, (user: any) => user.id)
  @JoinColumn({ name: 'userId' })
  userId: number // UserDAO
}
