const { DataTypes, Op } = require("sequelize");
const db = require("../config/db");
const sequelize = db.sequelize;
const attributeModel = require("../models/attributemode")(sequelize, DataTypes);
const historyAttributemodel = require("../models/historyAttributemodel")(sequelize, DataTypes);

const AddAttribute = async (req, res) => {
    try {
        const { attributename, color, description } = req.body;
        const AddedBy = req.user.firstname;
        const LastModifiedBy = req.user.firstname;

        // Check if attribute with the same name already exists
        const findSame = await attributeModel.findOne({ where: { attributename: attributename } });
        if (findSame) {
            return res.status(500).send({
                success: false,
                message: 'Attribute Name Already Exists',
            });
        }

        // Create new attribute
        const attributeData = await attributeModel.create({
            attributename,
            color,
            description,
            image: req.file.path,
            AddedBy,
            LastModifiedBy
        });

        return res.status(200).json({
            success: true,
            message: 'Attribute added successfully',
            data: attributeData
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const GetAttribute = async (req, res) => {
    try {
        let { page, size, search } = req.query;

        page = page ? parseInt(page, 10) : 1;
        size = size ? parseInt(size, 10) : 20;

        size = size <= 100 ? size : 20;

        // Calculate limit and offset
        const limit = size;
        const offset = (page - 1) * limit;

        // Initialize where condition
        const whereCondition = {};
        if (search) {
            whereCondition[Op.or] = [
                { attributename: { [Op.like]: `%${search}%` } }
            ];
        }

        // Total Record In Database
        const totaldatabaseRecord = await attributeModel.count();

        // Retrieve categories from the database
        const { count, rows } = await attributeModel.findAndCountAll({
            where: whereCondition,
            limit: limit,
            offset: offset,
        });

        return res.status(200).send({
            success: true,
            message: 'Attributes Retrieved Successfully...',
            data: rows,
            DataBaseTotalRecord: totaldatabaseRecord,
            TotalRecord: count,
            CurrentPage: page
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'An error occurred while fetching the Attributes',
            error: error.message
        });
    }
}


const GetByIdAttribute = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if id is undefined or null
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Missing or invalid Attribute ID in request parameters'
            });
        }

        const Attribute = await attributeModel.findOne({
            where: { attributeID: id }
        });

        if (!Attribute) {
            return res.status(404).send({
                success: false,
                message: 'Attribute Not Found...'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Attribute Retrieved Successfully...',
            data: Attribute
        });

    } catch (error) {
        console.error('Error retrieving Attribute:', error);
        return res.status(500).send({
            message: 'An error occurred while fetching the Attribute',
            error: error.message
        });
    }
}


const UpdateAttribute = async (req, res) => {
    try {
        const id = req.params.id;
        const { attributename, color, description } = req.body;
        const image = req.file.path;
        const AddedBy = req.user.firstname;
        const LastModifiedBy = req.user.firstname;

        // Find the attribute to update
        let attributeToUpdate = await attributeModel.findOne({ where: { attributeID: id } });
        // console.log(attributeToUpdate);

        if (!attributeToUpdate) {
            return res.status(404).send({
                success: false,
                message: 'Attribute Not Found...'
            });
        }

        const history_data = await historyAttributemodel.create({
            attributeID: attributeToUpdate.attributeID,
            attributename: attributeToUpdate.attributename,
            color: attributeToUpdate.color,
            description: attributeToUpdate.description,
            image: attributeToUpdate.image,
            AddedBy: attributeToUpdate.AddedBy,
            LastModifiedBy: attributeToUpdate.LastModifiedBy,
        });

        // Update attribute fields
        attributeToUpdate.attributename = attributename;
        attributeToUpdate.color = color;
        attributeToUpdate.description = description;
        if (image) {
            attributeToUpdate.image = image;
        }
        attributeToUpdate.AddedBy = AddedBy;
        attributeToUpdate.LastModifiedBy = LastModifiedBy;

        // Save the updated attribute
        await attributeToUpdate.save();

        return res.status(200).json({
            success: true,
            message: 'Attribute updated successfully',
            data: attributeToUpdate
        });

    } catch (error) {
        console.error('Error updating Attribute:', error);
        return res.status(500).send({
            message: 'An error occurred while updating the Attribute',
            error: error.message
        });
    }
};



const DeleteAttribute = async (req, res) => {
    try {
        const id = req.params.id;
        const GetAttribute = await attributeModel.findOne({ where: { attributeID: id } });
        // console.log(GetAttribute);

        if (!GetAttribute) {
            return res.status(404).send({
                message: 'Attribute not found'
            });
        }
        // console.log(GetCategory);

        const history = await historyAttributemodel.create(GetAttribute.dataValues)
        console.log(history);
        // console.log(duplicate);
        if (!history) {
            return res.status(500).send({
                success: false,
                message: 'Duplicate Attribute Can Not Add In Table...'
            })
        }

        await GetAttribute.destroy();

        return res.status(200).send({
            success: true,
            message: 'Attribute Delete Successfully...'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'An Error Occurred While Deleting The Attribute',
            error: error.message
        })
    }
}


module.exports = { AddAttribute, GetAttribute, GetByIdAttribute, UpdateAttribute, DeleteAttribute };
