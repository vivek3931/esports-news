import mongoose from 'mongoose';

const gameSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        image_url: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
