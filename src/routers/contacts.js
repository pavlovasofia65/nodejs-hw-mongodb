import {Router} from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { 
    getAllContactsController, 
    getContactByIdController, 
    createContactController,
    deleteContactController,
    patchContactController
} from '../controllers/contacts.js';
const router = Router();
router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

export default router;