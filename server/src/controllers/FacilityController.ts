import { Request, Response } from "express";
import { FacilityService } from "../services/FacilityService";

export class FacilityController {

  static async list(req: Request, res: Response) {
    console.log('Facility list:', { query: req.query, params: req.params, body: req.body });
    const facilities = await FacilityService.list();
    res.json(facilities);
  }


  static async get(req: Request, res: Response) {
    console.log('Facility get:', { query: req.query, params: req.params, body: req.body });
    const facility = await FacilityService.get(Number(req.params.id));
    if (!facility) return res.status(404).json({ message: "Not found" });
    res.json(facility);
  }


  static async create(req: Request, res: Response) {
    console.log('Facility create:', { query: req.query, params: req.params, body: req.body });
    const facility = await FacilityService.create(req.body);
    res.status(201).json(facility);
  }


  static async update(req: Request, res: Response) {
    console.log('Facility update:', { query: req.query, params: req.params, body: req.body });
    const facility = await FacilityService.update(Number(req.params.id), req.body);
    if (!facility) return res.status(404).json({ message: "Not found" });
    res.json(facility);
  }


  static async delete(req: Request, res: Response) {
    console.log('Facility delete:', { query: req.query, params: req.params, body: req.body });
    const result = await FacilityService.delete(Number(req.params.id));
    if (!result.affected) return res.status(404).json({ message: "Not found" });
    res.status(204).send();
  }
}
