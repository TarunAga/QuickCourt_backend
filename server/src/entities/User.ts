import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Bookings } from "./Bookings";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  password: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ default: "user" })
  role: string;

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @Column({ nullable: true })
  otp?: string;

  @Column({ name: "otp_expires", type: "bigint", nullable: true })
  otpExpires?: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date;
  @OneToMany(() => Bookings, (booking) => booking.user)
  bookings: Bookings[];
}
