import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    clientQuote: {
        type: String,
        required: true,
    },
    projectScreenshotUrl: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})


const Work = mongoose.model('Work', workSchema);
export default Work;