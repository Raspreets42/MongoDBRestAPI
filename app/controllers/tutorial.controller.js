const tutorialControllers = {};
const db = require("../models/models");
const Tutorial = db.tutorials;

tutorialControllers.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.description) {
        res.status(400).send({message: "Content can not be empty!", status: 400});
        return;
    }

    // Create a Tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    // Save Tutorial in the database
    tutorial
        .save(tutorial)
        .then(data => {
            res.status(201).send({details: data, message: 'Tutorial inserted successfully',status: 201});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial.",
                status: 500
            });
        });
};

tutorialControllers.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Tutorial.find(condition)
        .then(data => {
            res.status(200).send({ details:data,message: 'tutorials fetched successfully', stats: 200});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials.",
                status: 500
            });
        });
};

tutorialControllers.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Tutorial with id " + id , status: 404});
            else res.status(200).send({details: data,message: 'Tutorial fetched successfully',status: 200});
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Tutorial with id=" + id , status: 500});
        });
};

tutorialControllers.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!",
            status: 400
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
                    status: 404
                });
            } else res.status(200).send({ message: "Tutorial was updated successfully.",status: 200 });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id,status: 500
            });
        });
};

tutorialControllers.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
                    status: 404
                });
            } else {
                res.status(200).send({
                    message: "Tutorial was deleted successfully!",
                    status: 200
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id,
                status: 500
            });
        });
};

tutorialControllers.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.status(200).send({
                message: `${data.deletedCount} Tutorials were deleted successfully!`,
                status: 200
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials.",
                status: 500
            });
        });
};

tutorialControllers.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
        .then(data => {
            res.status(200).send({ details: data, message: 'All published tutorials are fetched successfully',status: 200});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials.",
                status: 500
            });
        });
};

module.exports = tutorialControllers;