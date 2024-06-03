import express from "express";
import { Authentication } from "./controllers/authenticationController.js";
import { Airport } from "./controllers/airportControllers.js";
import { Airline } from "./controllers/airlineController.js";
import { BayController } from "./controllers/bayControllers.js";
import { FlightController } from "./controllers/flightControllers.js"; // Assuming you have flight controllers

const router = express.Router();

router.post("/login", Authentication.login);

// Routes for airports
router.post("/airport/add", Airport.add);
router.delete("/airport/:id", Airport.delete);
router.get("/airport/all", Airport.getAllAirport);
router.get("/airport/:id", Airport.getAirport);
router.patch("/airport/:id", Airport.updateAirport);

// Routes for airlines
router.post("/airline/add", Airline.add);
router.delete("/airline/:id", Airline.delete);
router.get("/airline/all", Airline.getAllAirline);
router.get("/airline/:id", Airline.getAirline);
router.patch("/airline/:id", Airline.updateAirline);

// Routes for bays
router.post("/bay/add", BayController.add);
router.get("/bay/airport/:id", BayController.getBaysByAirport);
router.delete("/bay/:id", BayController.delete);
router.get("/bay/all", BayController.getAllBays);
router.get("/bay/:id", BayController.getBay);
router.patch("/bay/:id", BayController.updateBay);
router.post("/bay/assign-flight", BayController.assignBayToFlight); // New route
router.post("/bay/check-availability", BayController.checkBayAvailability); // New route
router.post("/bay/unassign-flight", BayController.unassignBayFromFlight); // New route


// Routes for flights
router.post("/flight/add", FlightController.add); // Assuming you have this in flight controllers
router.delete("/flight/:id", FlightController.delete); // Assuming you have this in flight controllers
router.get("/flight/all", FlightController.getAllFlights); // Assuming you have this in flight controllers
router.get("/flight/:id", FlightController.getFlight); // Assuming you have this in flight controllers
router.patch("/flight/:id", FlightController.updateFlight); // Assuming you have this in flight controllers

export default router;
