import mongoose, { model, Types } from "mongoose";
import { EventCateory } from "../types/EventTypes";

interface EventProps {
  title: string;
  description: string;
  date: Date;
  location: string;
  image: string;
  category: EventCateory;
  attendees: Types.ObjectId[];
}

const eventSchema = new mongoose.Schema<EventProps>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(EventCateory),
      required: true,
    },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // user who registered for event
  },
  { timestamps: true }
);

const Event = model<EventProps>("Event", eventSchema);
export default Event;
