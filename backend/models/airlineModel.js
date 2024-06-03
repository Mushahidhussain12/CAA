import mongoose, { Schema } from "mongoose";

const airlineSchema = mongoose.Schema({
     OperatorCode: { type: String},
     Name:{type:String},
     IataCode:{type:String},
     isHajjRegistered: { type: Boolean},
     isHajjProceed: { type: String },
     ScheduleFileNo:{type:String},
     SectionFileNo:{type:String},
     duration :{type:String},
     Email:{type:String},
     Status:{type:String},

     
    
}, { timestamps: true });

const airline = mongoose.model("airline", airlineSchema, 'airline');


export default airline;