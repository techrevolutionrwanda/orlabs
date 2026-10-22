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
}, {
    timestamps: true,
});

const Founder = mongoose.model('Founder', founderSchema);

export default Founder;