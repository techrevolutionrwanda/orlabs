import mongoose from 'mongoose';
const founderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'away', 'partly-booked', 'fully-booked'],
        default: 'available',
    },
    withUsSince: {
        type: Date,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },


}, {
    timestamps: true,
});

const Founder = mongoose.model('Founder', founderSchema);

export default Founder;