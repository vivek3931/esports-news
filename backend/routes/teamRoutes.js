import express from 'express';
import Team from '../models/Team.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Fetch all teams
// @route   GET /api/teams
// @access  Public
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find({});
        res.json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a team
// @route   POST /api/teams
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const team = new Team(req.body);
        const createdTeam = await team.save();
        res.status(201).json(createdTeam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Update a team
// @route   PUT /api/teams/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (team) {
            res.json(team);
        } else {
            res.status(404).json({ message: 'Team not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Delete a team
// @route   DELETE /api/teams/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (team) {
            res.json({ message: 'Team removed' });
        } else {
            res.status(404).json({ message: 'Team not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;
