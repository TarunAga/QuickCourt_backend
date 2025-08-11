import { Request, Response } from "express";
import { BookingService } from "../services/BookingService";

export class BookingController {

  static async list(req: Request, res: Response) {
    console.log('Booking list:', { query: req.query, params: req.params, body: req.body });
    const bookings = await BookingService.list();
    res.json(bookings);
  }


  static async get(req: Request, res: Response) {
    console.log('Booking get:', { query: req.query, params: req.params, body: req.body });
    const booking = await BookingService.get(req.params.id);
    if (!booking) return res.status(404).json({ message: "Not found" });
    res.json(booking);
  }


  static async create(req: Request, res: Response) {
    console.log('Booking create:', { query: req.query, params: req.params, body: req.body });
    const booking = await BookingService.create(req.body);
    res.status(201).json(booking);
  }


  static async cancel(req: Request, res: Response) {
    console.log('Booking cancel:', { query: req.query, params: req.params, body: req.body });
    const booking = await BookingService.cancel(req.params.id);
    if (!booking) return res.status(404).json({ message: "Not found" });
    res.json(booking);
  }
}
