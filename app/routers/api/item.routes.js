module.exports = (app) => {
    const items = require('../../controllers/item.controller');
    const auth = require('../../middleware/auth');

    // Create a new Item
    app.post('/api/item/add',auth, items.create);

    // Retrieve all Items
    app.get('/api/items', items.findAll);

    // Retrieve a single Item with itemId
    app.get('/api/item/single/:_id', items.findOne);

    // Update a Item with itemId
    app.put('/api/item/edit/:_id', items.update);

    // Delete a Item with itemId
    app.delete('/api/item/remove/:_id', auth, items.delete);
}