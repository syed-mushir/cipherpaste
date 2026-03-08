import express from 'express';
import { getPaste } from '../controllers/getPaste.js';
import { createPaste } from '../controllers/createPaste.js';

const router = express.Router();

router.get("/:id", getPaste);
router.post("/", createPaste);

export default router;