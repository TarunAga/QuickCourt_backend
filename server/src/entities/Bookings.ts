import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Facility } from "./Facility";

@Entity()
export class Bookings {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  date: Date;

  @Column()
  time: string;

  @ManyToOne(() => User, (user) => user.bookings, { nullable: false })
  user: User;

  @ManyToOne(() => Facility, (facility) => facility.bookings, {
    nullable: false,
  })
  facility: Facility;

  @CreateDateColumn()
  createdAt: Date;
}
