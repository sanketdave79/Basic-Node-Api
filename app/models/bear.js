var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    name: String,
    brand: String,
    restaurant : [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }]
});

module.exports = mongoose.model('Bear', BearSchema);

