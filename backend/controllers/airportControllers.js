import airport from "../models/airportModel.js";
class AirportControllers{

    async add(req,res){
        console.log("req recieved")

        console.log(req.body)

        try {
            const{AirportName,CountryId,CityId,Category,IcaoCode,IataCode,AirportStatus } = req.body;
            if(!AirportName || !CountryId || !CityId || !Category || !IcaoCode || !IataCode || !AirportStatus){
               return res.status(404).json({
                    error:"some fields are missing!"
                })
            }
            try{
                const data = await airport.create({
                    AirportName,CountryId,CityId,Category,IcaoCode,IataCode,AirportStatus
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
            const result = await airport.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({ error: "Resource not found" });
            }
            return res.status(200).json({ message: "Resource deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };


    async getAirport (req, res){
        console.log("Retrieve request received");
        try {
            const id = req.params.id;
            const airportData = await airport.findById(id);
            if (!airportData) {
                return res.status(404).json({ error: "Resource not found" });
            }
            return res.status(200).json({ data: airportData });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };


    async getAllAirport (req, res){
        console.log("Retrieve request received");
        try {
            const id = req.params.id;
            const airportData = await airport.find({});
            if (!airportData) {
                return res.status(404).json({ error: "Resource not found" });
            }
            return res.status(200).json({ data: airportData });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };


        async updateAirport (req, res){
        console.log("Update request received");
        try {
            const id = req.params.id;
            const { AirportCity, AirportCountry, IcaoCode, CaaCode } = req.body;
            if (!AirportCity || !AirportCountry || !IcaoCode || !CaaCode) {
                return res.status(400).json({ error: "Some fields are missing" });
            }
            const updatedAirport = await airport.findByIdAndUpdate(id, {
                AirportCity,
                AirportCountry,
                IcaoCode,
                CaaCode
            });
            if (!updatedAirport) {
                return res.status(404).json({ error: "Resource not found" });
            }
            return res.status(200).json({ data: updatedAirport });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };
    
    




}
const Airport = new AirportControllers();

export {
    Airport
}