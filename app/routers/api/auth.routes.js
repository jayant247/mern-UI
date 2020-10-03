module.exports = (app) => {
    const auth = require('../../controllers/auth.controller');
    const auth_check = require('../../middleware/auth');
    // Create a new User
    app.post('/api/check', auth.check);

    // Retrieve all Items
    app.get('/api/getUser',  auth_check, auth.getUser);

    // // Retrieve a single Item with itemId
    // app.get('/api/items/single/:_id', items.findOne);

    // // Update a Item with itemId
    // app.put('/api/items/edit/:_id', items.update);

    // // Delete a Item with itemId
    // app.delete('/api/items/remove/:_id', items.delete);
}