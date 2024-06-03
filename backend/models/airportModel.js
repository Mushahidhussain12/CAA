import mongoose, { Schema } from "mongoose";

const airportSchema = mongoose.Schema({
     AirportName: { type: String , require:true},
     CountryId: { type: Number},
     CityId:{type:Number},
     Category:{type:String},
     IcaoCode: { type: String},
     IataCode: { type: String },
     AirportStatus:{type:String}
     
    
}, { timestamps: true });

const airport = mongoose.model("airport", airportSchema, 'airport');


export default airport;