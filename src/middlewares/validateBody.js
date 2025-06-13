export const validateBody = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, {abortEarly: false,});
        next();
    } catch (err) {
        const validationErrors = err.details.map(detail => ({
        message: detail.message,
        path: detail.path,
    }));

    return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Validation error',
        data: validationErrors,
    });
    }
};