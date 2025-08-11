import { Request, Response } from "express";
import { ReviewService } from "../services/ReviewService";

export class ReviewController {

  static async list(req: Request, res: Response) {
    console.log('Review list:', { query: req.query, params: req.params, body: req.body });
    const reviews = await ReviewService.list(Number(req.params.facilityId));
    res.json(reviews);
  }


  static async create(req: Request, res: Response) {
    console.log('Review create:', { query: req.query, params: req.params, body: req.body });
    const review = await ReviewService.create(req.body);
    res.status(201).json(review);
  }
}
