import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Sports } from "./Sports";

import { Facility } from "./Facility";

@Entity()
export class Bookings {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  date: Date;

  @Column()
  time: string;

  @ManyToOne(() => Facility, (facility) => facility.bookings, { nullable: false })
  facility: Facility;

  @Column()
  courtName: string;

  @Column("decimal")
  price: number;

  @Column({ default: "Confirmed" })
  status: "Confirmed" | "Cancelled" | "Completed";

  @ManyToOne(() => User, (user) => user.bookings, { nullable: false })
  user: User;

  @ManyToOne(() => Sports, { nullable: false })
  sports: Sports;

  @CreateDateColumn()
  createdAt: Date;
}
