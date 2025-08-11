import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Facility } from "./Facility";

@Entity()
export class Sports {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("int")
  courts: number;

  @ManyToMany(() => Facility, (facility) => facility.sports)
  facilities: Facility[];
}
