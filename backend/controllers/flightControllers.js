import Flight from "../models/flightModel.js";
import Bay from "../models/bayModel.js";
import mongoose from "mongoose";

class FlightControllers {
    
    // Add a new flight
    async add(req, res) {
        console.log("Request received to add flight");

        const { OperatorCode, FlightNumber, DepartureAirport, ArrivalAirport, ArrivalTime, DepartureTime } = req.body;

        if (!OperatorCode || !FlightNumber || !DepartureAirport || !ArrivalAirport) {
            return res.status(400).json({
                error: "OperatorCode, FlightNumber, DepartureAirport, and ArrivalAirport fields are required!"
            });
        }

        try {
            const data = await Flight.create({
                OperatorCode,
                FlightNumber,
                DepartureAirport,
                ArrivalAirport,
                ArrivalTime,
                DepartureTime,
                BayAssigned: null
            });
            return res.status(200).json({ message: data });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                error: error.message
            });
        }
    }

    // Delete a flight by ID
    async delete(req, res) {
        console.log("Delete request received for flight");

        try {
            const id = req.params.id;
            const result = await Flight.findByIdAndDelete(id);

            if (!result) {
                return res.status(404).json({ error: "Resource not found" });
            }
            return res.status(200).json({ message: "Resource deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    // Get a single flight by ID
    async getFlight(req, res) {
        console.log("Retrieve request received for flight");

        try {
            const id = req.params.id;
            const flightData = await Flight.findById(id).populate('BayAssigned');

            if (!flightData) {
                return res.status(404).json({ error: "Resource not found" });
            }
            return res.status(200).json({ data: flightData });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    // Get all flights
    async getAllFlights(req, res) {
        console.log("Retrieve all request received for flights");

        try {
            const flightData = await Flight.find({}).populate('BayAssigned');

            if (!flightData || flightData.length === 0) {
                return res.status(404).json({ error: "No resources found" });
            }
            return res.status(200).json({ data: flightData });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    // Update a flight by ID
    async updateFlight(req, res) {
        console.log("Update request received for flight");

        try {
            const id = req.params.id;
            const { OperatorCode, FlightNumber, DepartureAirport, ArrivalAirport, ArrivalTime, DepartureTime } = req.body;

            if (!OperatorCode || !FlightNumber || !DepartureAirport || !ArrivalAirport) {
                return res.status(400).json({
                    error: "OperatorCode, FlightNumber, DepartureAirport, and ArrivalAirport fields are required!"
                });
            }

            const updatedFlight = await Flight.findByIdAndUpdate(id, {
                OperatorCode,
                FlightNumber,
                DepartureAirport,
                ArrivalAirport,
                ArrivalTime,
                DepartureTime
            }, { new: true }).populate('BayAssigned');

            if (!updatedFlight) {
                return res.status(404).json({ error: "Resource not found" });
            }
            return res.status(200).json({ data: updatedFlight });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    // Assign a bay to a flight
    async assignBay(req, res) {
        console.log("Request received to assign bay to flight");

        const { flightId, bayId } = req.body;

        if (!flightId || !bayId) {
            return res.status(400).json({
                error: "Flight ID and Bay ID are required!"
            });
        }

        try {
            const flight = await Flight.findById(flightId);
            if (!flight) {
                return res.status(404).json({ error: "Flight not found" });
            }

            const bay = await Bay.findById(bayId);
            if (!bay) {
                return res.status(404).json({ error: "Bay not found" });
            }

            flight.BayAssigned = bayId;
            await flight.save();

            return res.status(200).json({ message: "Bay assigned to flight successfully", data: flight });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

const FlightController = new FlightControllers();

export {
    FlightController
};
