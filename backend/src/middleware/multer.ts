import multer from "multer";
const storage = multer.memoryStorage();
const MAX_FILE_SIZE = 5 * 1000 * 1000;
export const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
});
