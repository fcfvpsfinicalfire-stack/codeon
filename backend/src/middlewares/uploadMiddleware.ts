import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure directories exist
const uploadDir = 'uploads/payments';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Use a temporary unique name initially. We will rename it in the controller after validation.
        // This prevents overwriting or "guessing" filenames before we know the order is valid.
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'temp_' + uniqueSuffix + ext);
    }
});

// File Filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        cb(new Error('Only images (jpeg, jpg, png) and PDFs are allowed!'));
    }
};

export const uploadPaymentProof = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: fileFilter
});
