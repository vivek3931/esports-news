import mongoose from 'mongoose';

const tournamentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        videogame: {
            name: { type: String, required: true },
            slug: { type: String, required: true },
        },
        begin_at: {
            type: Date,
            required: true,
        },
        end_at: {
            type: Date,
            required: true,
        },
        league: {
            name: { type: String },
            image_url: { type: String },
        },
        status: {
            type: String,
            default: 'upcoming',
        },
        tier: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;
