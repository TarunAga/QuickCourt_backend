import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Bookings } from "./Bookings";
import { Sports } from "./Sports";

@Entity("facilities")
export class Facility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Bookings, (booking) => booking.facility)
  bookings: Bookings[];

  @ManyToMany(() => Sports, (sport) => sport.facilities)
  @JoinTable()
  sports: Sports[];
}
