const validate = (schema) => (req, res, next) => {
    if (!schema) {
        return res.status(400).json({ error: 'Validation schema is undefined' });
    }

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details
            .map((err) => err.message.replace(/"/g, ''))
            .join(', ');

        return res.status(400).json({ error: errorMessages });
    }

    next();
};

module.exports = validate;