import express from 'express';
import { getPaste } from '../controllers/getPaste.js';
import { createPaste } from '../controllers/createPaste.js';
import { handlePayloadSize } from '../middlewares/handlePayloadSize.js';
import { validateInput } from '../middlewares/validateInput.js'
import { createPasteRateLimitMiddleware } from '../middlewares/rateLimit.js';

const router = express.Router();

router.get("/:id", getPaste);
router.post("/", createPasteRateLimitMiddleware, validateInput, handlePayloadSize, createPaste);

export default router;