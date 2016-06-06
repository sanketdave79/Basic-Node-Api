/**
 * Created by sanket on 5/06/2016.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomerSchema   = new Schema({
    name: String,
    email: String
});

module.exports = mongoose.model('Customer', CustomerSchema);
