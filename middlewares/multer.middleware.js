import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the 'public/temp' directory exists
const tempDir = path.join(__dirname, "../public/temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Configure Multer to store files in the temporary folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir); // Store in the 'public/temp' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Add timestamp to avoid name conflicts
  },
});

const upload = multer({ storage: storage });
export { upload };
