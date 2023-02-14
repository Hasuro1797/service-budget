/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'operations'})
export class Operation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column({ type: 'decimal' })
  amount: number;

  @CreateDateColumn()
  createAt: Date;
  
  @UpdateDateColumn()
  updateAt: Date;
}
