import mongoose from 'mongoose';

const teamSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        acronym: {
            type: String,
        },
        image_url: {
            type: String,
        },
        location: {
            type: String,
        },
        current_videogame: {
            name: { type: String, required: true },
        },
        players: [
            {
                name: { type: String },
                first_name: { type: String },
                last_name: { type: String },
                role: { type: String },
                image_url: { type: String },
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Team = mongoose.model('Team', teamSchema);

export default Team;
