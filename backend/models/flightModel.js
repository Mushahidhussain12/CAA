import mongoose, { Schema } from "mongoose";

const FlightSchema = mongoose.Schema({
    OperatorCode: { type: String, required: true },
    FlightNumber: { type: String, required:true },
    DepartureAirport:{type:String,required:true},
    ArrivalAirport:{type:String,required:true},
    ArrivalTime: { type: String },
    DepartureTime: { type: String, default: '' },
    BayAssigned: {  type:String, default:''
},
   



}, { timestamps: true });

const Flight = mongoose.model("Flight", FlightSchema, 'Flight');


export default Flight;