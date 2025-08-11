import { Bookings } from "../entities/Bookings";
import { AppDataSource } from "../../datasource";

export class BookingService {
  static async list() {
    return AppDataSource.getRepository(Bookings).find({
      relations: ["user", "facility", "sports"],
    });
  }
  static async get(id: string) {
    return AppDataSource.getRepository(Bookings).findOne({
      where: { id },
      relations: ["user", "facility", "sports"],
    });
  }
  static async create(data: any) {
    const repo = AppDataSource.getRepository(Bookings);
    const booking = repo.create(data);
    return repo.save(booking);
  }
  static async cancel(id: string) {
    const repo = AppDataSource.getRepository(Bookings);
    const booking = await repo.findOneBy({ id });
    if (!booking) return null;
    booking.status = "Cancelled";
    return repo.save(booking);
  }
}
