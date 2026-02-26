import express from 'express';
import Stream from '../models/Stream.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Fetch all streams (upcoming matches / live matches)
// @route   GET /api/matches/running
// @access  Public
// Note: We are hijacking /api/matches/running to return streams since that's what the frontend expects for LiveMatches
router.get('/running', async (req, res) => {
    try {
        // Here we just return all streams. In a real app we might filter by is_main or status.
        const streams = await Stream.find({}).populate('match_id');

        // Map streams to look like the mock PandaScore response
        const mappedStreams = streams.map(s => ({
            id: s._id,
            name: s.title,
            begin_at: new Date().toISOString(),
            status: s.status, // use dynamic status
            streams_list: [
                {
                    language: s.language,
                    embed_url: s.embed_url,
                    raw_url: s.raw_url,
                    main: s.is_main,
                    views: s.views
                }
            ],
            tournament: s.match_id || { name: 'Admin Uploaded Match' },
            videogame: { name: 'Esports Game' },
            opponents: []
        }));

        res.json(mappedStreams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Fetch upcoming matches
// @route   GET /api/matches/upcoming
// @access  Public
router.get('/upcoming', async (req, res) => {
    try {
        // Return nothing for upcoming for now, or you could add a 'status field to stream'
        res.json([]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a stream
// @route   POST /api/streams
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const stream = new Stream(req.body);
        const createdStream = await stream.save();
        res.status(201).json(createdStream);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Delete a stream
// @route   DELETE /api/streams/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const stream = await Stream.findByIdAndDelete(req.params.id);
        if (stream) {
            res.json({ message: 'Stream removed' });
        } else {
            res.status(404).json({ message: 'Stream not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Toggle a stream's status
// @route   PUT /api/matches/:id/toggle-status
// @access  Private/Admin
router.put('/:id/toggle-status', protect, admin, async (req, res) => {
    try {
        const stream = await Stream.findById(req.params.id);
        if (stream) {
            stream.status = stream.status === 'running' ? 'offline' : 'running';
            const updatedStream = await stream.save();
            res.json(updatedStream);
        } else {
            res.status(404).json({ message: 'Stream not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Increment a stream's view count
// @route   PUT /api/matches/:id/view
// @access  Public
router.put('/:id/view', async (req, res) => {
    try {
        const stream = await Stream.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (stream) {
            res.json({ message: 'View counted', views: stream.views });
        } else {
            res.status(404).json({ message: 'Stream not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;
