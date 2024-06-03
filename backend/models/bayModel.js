import mongoose, { Schema } from "mongoose";

const BaySchema = new Schema({
    name: { type: String, required: true },
    bay_type: { type: String },
    power: { type: Boolean, default: false },
    cooling: { type: Boolean, default: false },
    pbb: { type: Boolean, default: false },
    airport: { type: Schema.Types.ObjectId, ref: 'airport', required: true },
    schedule: [{
        // date: { type: Date, required: true },
        
            flight: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true }
        
    }]
}, { timestamps: true });

const Bay = mongoose.model("Bay", BaySchema, 'Bay');

export default Bay;
