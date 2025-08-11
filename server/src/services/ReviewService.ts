import { Review } from "../entities/Review";
import { AppDataSource } from "../../datasource";

export class ReviewService {
  static async list(facilityId: number) {
    return AppDataSource.getRepository(Review).find({
      where: { facility: { id: facilityId } },
      relations: ["user", "facility"],
    });
  }
  static async create(data: any) {
    const repo = AppDataSource.getRepository(Review);
    const review = repo.create(data);
    return repo.save(review);
  }
}
