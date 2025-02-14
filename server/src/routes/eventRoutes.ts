import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getRegisteredUser,
  registerEvent,
  updateEvent,
} from "../controllers/eventController";
import { verifyAdmin, verifyUser } from "../middleware/authMiddleware";
import upload from "../config/multerConfig";

const router = Router();

//create event (admin only)
router.post("/create", verifyAdmin, upload.single("image"), createEvent);
//edit event
router.put("/:eventId", verifyAdmin, updateEvent);
//delete event
router.delete("/:eventId", verifyAdmin, deleteEvent);
//get registered users
router.get("/registered-users", verifyAdmin, getRegisteredUser);

//get all events
router.get("/", getAllEvents);
//get event by id
router.get("/:eventId", getEventById);
//register event
router.post("/:eventId/register", verifyUser, registerEvent);

export default router;
