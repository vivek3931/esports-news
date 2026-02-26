import express from 'express';
import Tournament from '../models/Tournament.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Fetch all tournaments
// @route   GET /api/tournaments
// @access  Public
router.get('/', async (req, res) => {
    try {
        const tournaments = await Tournament.find({}).sort({ begin_at: -1 });
        res.json(tournaments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a tournament
// @route   POST /api/tournaments
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const tournament = new Tournament(req.body);
        const createdTournament = await tournament.save();
        res.status(201).json(createdTournament);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Update a tournament
// @route   PUT /api/tournaments/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (tournament) {
            res.json(tournament);
        } else {
            res.status(404).json({ message: 'Tournament not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Delete a tournament
// @route   DELETE /api/tournaments/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndDelete(req.params.id);
        if (tournament) {
            res.json({ message: 'Tournament removed' });
        } else {
            res.status(404).json({ message: 'Tournament not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;
