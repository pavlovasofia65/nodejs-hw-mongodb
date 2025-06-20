import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { getAllContacts, getContactById, createContact, deleteContact, updateContact } from "../services/contacts.js";
import { parseSortParams } from '../utils/parseSortParams.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
export const getAllContactsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.json({
        status: 200,
        message: 'Successfully found contacts',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { _id: userId } = req.user;

        const contact = await getContactById(contactId, userId);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    } catch (err) {
        next(err);
    }
};

export const createContactController = async (req, res) => {
    const { _id: userId } = req.user;
    const photo = req.file?.path || null;

    const contact = await createContact({
        ...req.body,
        photo,
        userId,
    });

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const {contactId} = req.params;
    const { _id: userId } = req.user;
    const contact = await deleteContact(contactId, userId);
    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
    const {contactId} = req.params;
    const { _id: userId } = req.user;
    const photo = req.file;

    let photoUrl;

    if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const result = await updateContact(contactId, userId, { 
        ...req.body,
        photo: photoUrl,
    });
    if (!result) {
        next(createHttpError(404, 'ContactNotFound'));
        return;
    }
    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.contact,
    });
};

export const getContactsController = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const { page, perPage } = parsePaginationParams(req.query);
        const { sortBy, sortOrder } = parseSortParams(req.query);

        const contacts = await getAllContacts({
            userId,
            page,
            perPage,
            sortBy,
            sortOrder,
        });

        res.json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
    } catch (err) {
        next(err);
    }
};