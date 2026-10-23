import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    oneLineSummary: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    targetDate: {
        type: Date,
        required: true,
    },
  
   
    techenologies: {
        type: String,
        required: true,
    },
    client: {
 clientName: {
        type: String,
        required: true,
        },
    role: {
        type: String,
        required: true,
        },
    companyName: {
        type: String,
        required: true,
        },
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