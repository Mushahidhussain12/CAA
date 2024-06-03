import airport from "../models/airportModel.js";
import Bay from "../models/bayModel.js";
import mongoose from "mongoose";
import Flight from "../models/flightModel.js";


const toMicroseconds = (dateStr) => new Date(dateStr).getTime() * 1000;


class BayControllers {

   
        async add(req, res) {
            console.log("Request received");
    
            const { name, bay_type, power, cooling, pbb, airport } = req.body;
    
            if (!name || !airport) {
                return res.status(400).json({
                    error: "Name and airport fields are required!"
                });
            }
    
            try {
                const data = await Bay.create({
                    name, bay_type, power, cooling, pbb, airport
                });
                return res.status(200).json({ message: data });
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    error: error.message
                });
            }
        }
    
        async delete(req, res) {
            console.log("Delete request received");
    
            try {
                const id = req.params.id;
                const result = await Bay.findByIdAndDelete(id);
    
                if (!result) {
                    return res.status(404).json({ error: "Resource not found" });
                }
                return res.status(200).json({ message: "Resource deleted successfully" });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal server error" });
            }
        }
    
        async getBay(req, res) {
            console.log("Retrieve request received");
    
            try {
                const id = req.params.id;
                const bayData = await Bay.findById(id);
    
                if (!bayData) {
                    return res.status(404).json({ error: "Resource not found" });
                }
                return res.status(200).json({ data: bayData });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal server error" });
            }
        }
    
        async getAllBays(req, res) {
            console.log("Retrieve all request received");
    
            try {
                const bayData = await Bay.find({});
    
                if (!bayData || bayData.length === 0) {
                    return res.status(404).json({ error: "No resources found" });
                }
                return res.status(200).json({ data: bayData });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal server error" });
            }
        }
    
        async updateBay(req, res) {
            console.log("Update request received");
    
            try {
                const id = req.params.id;
                const { name, bay_type, power, cooling, pbb, airport } = req.body;
    
                if (!name || !airport) {
                    return res.status(400).json({
                        error: "Name and airport fields are required!"
                    });
                }
    
                const updatedBay = await Bay.findByIdAndUpdate(id, {
                    name, bay_type, power, cooling, pbb, airport
                }, { new: true });
    
                if (!updatedBay) {
                    return res.status(404).json({ error: "Resource not found" });
                }
                return res.status(200).json({ data: updatedBay });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal server error" });
            }
        }
    
        async getBaysByAirport(req, res) {
            console.log("Retrieve bays by airport request received");
    
            try {
                const airportId = req.params.id;
                console.log(airportId);
                const bayData = await Bay.find({ airport: airportId });

                console.log(bayData)
    
                if (!bayData || bayData.length === 0) {
                    return res.status(404).json({ error: "No bays found for this airport" });
                }
                return res.status(200).json({ data: bayData });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal server error" });
            }
        }
    
        async assignBayToFlight(req, res) {
            console.log("Assign bay to flight request received");
        
            const { bayId, flightId, startTime, endTime } = req.body;
            console.log(startTime);
            console.log(endTime);
            
            console.log(req.body);
        
            if (!bayId || !flightId || !startTime || !endTime) {
                return res.status(400).json({
                    error: "All fields are required!"
                });
            }
        
            try {
                const bay = await Bay.findById(bayId);
                const flight = await Flight.findById(flightId);
        
                if (!bay) {
                    return res.status(404).json({ error: "Bay not found" });
                }
        
                if (!flight) {
                    return res.status(404).json({ error: "Flight not found" });
                }
        
                // Add the schedule with startTime and endTime
                bay.schedule.push({
                    flight: flightId,
                    startTime,
                    endTime
                });
        
                // Save the changes
                await bay.save();
        
                // Update the flight with the assigned bay
                flight.BayAssigned = bayId;
                await flight.save();
                console.log(flight);
        
                return res.status(200).json({ message: "Flight assigned to bay successfully" });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal server error" });
            }
        }
        
          
        

       

        async checkBayAvailability(req, res) {
            console.log("Check bay availability request received");
        
            const { airportId, startTime, endTime } = req.body;
        
            console.log(startTime);
            console.log(endTime);
        
            if (!airportId || !startTime || !endTime) {
                return res.status(400).json({
                    error: "All fields are required!"
                });
            }
        
            try {
                const bays = await Bay.find({ airport: airportId });
        
                if (!bays || bays.length === 0) {
                    return res.status(404).json({ error: "No bays found for this airport" });
                }
        
                const availableBays = [];
                const requestedStartTime = toMicroseconds(startTime);
                const requestedEndTime = toMicroseconds(endTime);
        
                for (const bay of bays) {
                    let isAvailable = true;

                    console.log("checking bay:",bay);
        
                    for (const schedule of bay.schedule) {

                        console.log("checking schedule:",schedule);
                    
                        const flightStartTime = toMicroseconds(schedule.startTime);
                        const flightEndTime = toMicroseconds(schedule.endTime);

                        console.log(requestedStartTime);
                        console.log(requestedEndTime);
                        console.log(flightStartTime);
                        console.log(flightEndTime);

                        console.log(startTime);
                        console.log(endTime);
                        console.log(schedule.startTime);
                        console.log(schedule.endTime);
        
                        if (
                            (requestedStartTime >= flightStartTime && requestedStartTime < flightEndTime) ||
                            (requestedEndTime > flightStartTime && requestedEndTime <= flightEndTime) ||
                            (requestedStartTime <= flightStartTime && requestedEndTime >= flightEndTime)
                        ) {
                            console.log("this condition has been trigerred")
                            isAvailable = false;
                            break;
                        }
                    }
        
                    if (isAvailable) {
                        availableBays.push(bay);
                    }
                }
        
                if (availableBays.length === 0) {
                    return res.status(404).json({ error: "No available bays found for the specified time" });
                }
        
                return res.status(200).json({ data: availableBays });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal server error" });
            }
        }

        async unassignBayFromFlight(req, res) {
            console.log("Unassign bay from flight request received");
            const { bayId, flightId } = req.body;
        
            if (!bayId || !flightId) {
                return res.status(400).json({
                    error: "Bay ID and flight ID are required!"
                });
            }
        
            try {
                const bay = await Bay.findById(bayId);
        
                if (!bay) {
                    return res.status(404).json({ error: "Bay not found" });
                }
        
                const flightIndex = bay.schedule.findIndex(schedule => schedule.flight.toString() === flightId.toString());
                if (flightIndex === -1) {
                    return res.status(404).json({ error: "Flight not assigned to this bay" });
                }
                
                // Remove the flight from the bay's schedule
                bay.schedule.splice(flightIndex, 1);
                await bay.save();
        
                // Update the flight to remove the bay assignment
                const flight = await Flight.findById(flightId);
                if (flight) {
                    flight.BayAssigned = "";
                    await flight.save();
                }
        
                return res.status(200).json({ message: "Bay unassigned from flight successfully" });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal server error" });
            }
        }   
    }

const BayController = new BayControllers();

export {
    BayController
};
