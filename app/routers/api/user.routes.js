module.exports = (app) => {
    const users = require('../../controllers/user.controller');

    // Create a new User
    app.post('/api/user/add', users.create);

    // // Retrieve all Items
    // app.get('/api/items', items.findAll);

    // // Retrieve a single Item with itemId
    // app.get('/api/items/single/:_id', items.findOne);

    // // Update a Item with itemId
    // app.put('/api/items/edit/:_id', items.update);

    // // Delete a Item with itemId
    // app.delete('/api/items/remove/:_id', items.delete);
}