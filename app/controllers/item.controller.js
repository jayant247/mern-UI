const Item = require("../models/Item.model");

// Create and Save a new Note

// @route POST api/items
// @dec Create A Post
// @access public

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Item content can not be empty"
    });
  }

  // Create a Item
  const item = new Item({
    name: req.body.name || "Untitled Item"
  });

  // Save Note in the database
  item
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Item."
      });
    });
};

// @route GET api/items
// @dec Get All Items
// @access public

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => {
      //res.send(notes);
      res.json(items);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};

// Find a single item with a itemId
exports.findOne = (req, res) => {
  Item.findById(req.params._id)
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: "Item not found with id " + req.params._id
        });
      }
      res.send(item);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Item not found with id " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error retrieving item with id " + req.params._id
      });
    });
};

// @route POST api/items/delete
// @dec Create A Post
// @access public

// Delete a item with the specified itemId in the request
exports.delete = (req, res) => {
  Item.findByIdAndRemove(req.params._id)
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: "item not found with id " + req.params._id
        });
      }
      res.send({ message: "item deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "item not found with id " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Could not delete item with id " + req.params._id
      });
    });
};

// Update a note identified by the itemId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Item content can not be empty"
    });
  }

  // Find note and update it with the request body
  Item.findByIdAndUpdate(
    req.params._id,
    {
      name: req.body.name || "Untitled Item"
    },
    { new: true }
  )
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: "Item not found with id " + req.params._id
        });
      }
      res.send(item);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Item not found with id " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params._id
      });
    });
};
