import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import {
    getContactByIdController,
    createContactController,
    deleteContactController,
    patchContactController,
    getContactsController,
} from '../controllers/contacts.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post('/', upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.patch(
    '/:contactId',
    isValidId,
    upload.single('photo'), 
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController)
);

export default router;
