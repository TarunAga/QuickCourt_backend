import { Facility } from "../entities/Facility";
import { AppDataSource } from "../../datasource";

export class FacilityService {
  static async list() {
    return AppDataSource.getRepository(Facility).find();
  }
  static async get(id: number) {
    return AppDataSource.getRepository(Facility).findOne({
      where: { id },
      relations: ["sports", "reviews", "bookings"],
    });
  }
  static async create(data: any) {
    const repo = AppDataSource.getRepository(Facility);
    const facility = repo.create(data);
    return repo.save(facility);
  }
  static async update(id: number, data: any) {
    const repo = AppDataSource.getRepository(Facility);
    let facility = await repo.findOneBy({ id });
    if (!facility) return null;
    repo.merge(facility, data);
    return repo.save(facility);
  }
  static async delete(id: number) {
    const repo = AppDataSource.getRepository(Facility);
    return repo.delete({ id });
  }
}
