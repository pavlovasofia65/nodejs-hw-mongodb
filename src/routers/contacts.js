import {Router} from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createStudentSchema, updateStudentSchema } from '../validation/students.js';
import { 
    getContactByIdController, 
    createContactController,
    deleteContactController,
    patchContactController,
    getContactsController
} from '../controllers/contacts.js';
const router = Router();
router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post('/contacts', validateBody(createStudentSchema), ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.patch('/contacts/:contactId', isValidId, validateBody(updateStudentSchema), ctrlWrapper(patchContactController));

export default router;