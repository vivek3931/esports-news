import express from 'express';
import Game from '../models/Game.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Fetch all games
// @route   GET /api/games
// @access  Public
router.get('/', async (req, res) => {
    try {
        const games = await Game.find({});
        res.json(games);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a game
// @route   POST /api/games
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const game = new Game(req.body);
        const createdGame = await game.save();
        res.status(201).json(createdGame);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Update a game
// @route   PUT /api/games/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (game) {
            res.json(game);
        } else {
            res.status(404).json({ message: 'Game not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Delete a game
// @route   DELETE /api/games/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (game) {
            res.json({ message: 'Game removed' });
        } else {
            res.status(404).json({ message: 'Game not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;
