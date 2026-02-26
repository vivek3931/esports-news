import mongoose from 'mongoose';

const streamSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            default: 'en',
        },
        embed_url: {
            type: String,
            required: true,
        },
        raw_url: {
            type: String,
        },
        is_main: {
            type: Boolean,
            default: false,
        },
        match_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tournament', // Could point to a specific match if we make a Match model, but for now Tournament works
        },
        views: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['running', 'offline'],
            default: 'running',
        }
    },
    {
        timestamps: true,
    }
);

const Stream = mongoose.model('Stream', streamSchema);

export default Stream;
