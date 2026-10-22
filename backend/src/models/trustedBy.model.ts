import mongoose from 'mongoose';

const trustedBySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
});

const TrustedBy = mongoose.model('TrustedBy', trustedBySchema);

export default TrustedBy;