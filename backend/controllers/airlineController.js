import airline from "../models/airlineModel.js";
class AirlineControllers{

    async add(req,res){
        console.log("req recieved")

        console.log(req.body)

        try {
            const{OperatorCode,Name,IataCode,isHajjRegistered,isHajjProceed,ScheduleFileNo, SectionFileNo , Email,Status,duration } = req.body;
            if(!OperatorCode || !Name || !IataCode || !isHajjProceed || !ScheduleFileNo || !SectionFileNo || !Email || !Status || !duration ){
               return res.status(404).json({
                    error:"some fields are missing!"
                })
            }
            try{
                const data = await airline.create({
                    OperatorCode,Name,IataCode,isHajjRegistered,isHajjProceed,ScheduleFileNo, SectionFileNo, duration, Email,Status
                })

                return res.status(200).json({message:data})
            } catch(error){
                res.status(400).json({
                    message: error
                })
                console.log(error);
            }  
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    async delete (req, res){
        console.log("Delete request received");
        try {
            const id = req.params.id;
            const result = await airline.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({ error: "Resource not found" });
            }
            return res.status(200).json({ message: "Resource deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };


    async getAirline (req, res){
        console.log("Retrieve request received");
        try {
            const id = req.params.id;
            const airlineData = await airline.findById(id);
            if (!airlineData) {
                return res.status(404).json({ error: "Resource not found" });
            }
            return res.status(200).json({ data: airlineData });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };


    async getAllAirline (req, res){
        console.log("Retrieve request received");
        try {
            const id = req.params.id;
            const airlineData = await airline.find({});
            if (!airlineData) {
                return res.status(404).json({ error: "Resource not found" });
            }
            return res.status(200).json({ data: airlineData });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };


        async updateAirline (req, res){
        console.log("Update request received");
        try {
            const id = req.params.id;
            const{OperatorCode,Name,IataCode,isHajjRegistered,isHajjProceed,ScheduleFileNo, SectionFileNo , Email,Status,duration } = req.body;
            if(!OperatorCode || !Name || !IataCode || !isHajjRegistered || !isHajjProceed || !ScheduleFileNo || !SectionFileNo || !Email || !Status || !duration){
               return res.status(404).json({
                    error:"some fields are missing!"
                })
            }
            const updatedAirline = await airline.findByIdAndUpdate(id, {
                OperatorCode,Name,IataCode,isHajjRegistered,isHajjProceed,ScheduleFileNo, SectionFileNo , Email,Status,duration
            });
            if (!updatedAirline) {
                return res.status(404).json({ error: "Resource not found" });
            }
            return res.status(200).json({ data: updatedAirline });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };
}
const Airline = new AirlineControllers();

export {
    Airline
}