import { Router } from 'express';
import { FileController } from '../../controllers/fileController';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { validateFileUpload } from '../../middlewares/validationMiddleware';

const router = Router();
const fileController = new FileController();

// File upload endpoint
router.post('/upload', 
  authMiddleware, 
  validateFileUpload, 
  fileController.uploadFile.bind(fileController)
);

// Get file by ID
router.get('/:id', 
  authMiddleware, 
  fileController.getFileById.bind(fileController)
);

// Get all files for a user
router.get('/', 
  authMiddleware, 
  fileController.getAllFiles.bind(fileController)
);

// Delete file by ID
router.delete('/:id', 
  authMiddleware, 
  fileController.deleteFile.bind(fileController)
);

// Update file metadata
router.put('/:id', 
  authMiddleware, 
  fileController.updateFile.bind(fileController)
);

export default router;
