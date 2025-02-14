import { Request, Response } from "express";
import Event from "../models/eventModels";
import { AuthenticatedRequest } from "../types/express";
import { Types } from "mongoose";

interface MulterS3Request extends Request {
  file?: Express.Multer.File & { location?: string };
}

export const createEvent = async (
  req: MulterS3Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Received Request Data:", req.body);
    console.log("Uploaded File:", req.file);

    const { title, description, date, location, category } = req.body;
    const formattedDate = new Date(date);
    const image = req.file?.location || "";

    if (!title || !description || !date || !location || !image || !category) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newEvent = new Event({
      title,
      description,
      date: formattedDate,
      location,
      image,
      category,
      attendees: [],
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error: any) {
    console.error("Event Creation Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get All Events Controller
export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({ events });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

// Get event by id
export const getEventById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ event });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    res
      .status(500)
      .json({ message: "Error fetching event", error: error.message });
  }
};

//update Event
export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { eventId } = req.params;
    if (req.body.date) {
      req.body.date = new Date(req.body.date).toISOString();
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });

    if (!updatedEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating event", error: error.message });
  }
};

//Delete Event
export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deleteEvent) {
      res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error deleting event ", error: error.message });
  }
};

export const registerEvent = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: Please log in first" });
      return;
    }

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ message: "Even not found" });
      return;
    }

    if (
      event.attendees.some((attendee) =>
        attendee.equals(new Types.ObjectId(userId))
      )
    ) {
      res
        .status(400)
        .json({ message: "You are already registered for this event" });
      return;
    }

    event.attendees.push(new Types.ObjectId(userId));
    await event.save();

    res.status(200).json({ message: "Successfully registered for this event" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error registering for event", error: error.message });
  }
};

export const getRegisteredUser = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().populate("attendees", "name email");
    res.status(200).json({ events });
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching registered user",
      error: error.message,
    });
  }
};
