import { Review } from "./Review";
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

  @Column({ nullable: true })
  description?: string;

  @Column("simple-array", { nullable: true })
  amenities?: string[];

  @Column("simple-array", { nullable: true })
  photoGallery?: string[];

  @Column({ nullable: true })
  shortLocation?: string;

  @Column("decimal", { nullable: true })
  startingPricePerHour?: number;

  @Column({ type: "float", nullable: true })
  rating?: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToMany(() => Sports, (sport) => sport.facilities)
  @JoinTable()
  sports: Sports[];

  @OneToMany(() => Bookings, (booking) => booking.facility)
  bookings: Bookings[];

  @OneToMany(() => Review, (review) => review.facility)
  reviews: Review[];
}
