const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin_Schema = new Schema(
		{
			userid: {
				type: String
			},
            password: {
				type: String
			},
		},
		{
			collection: 'admin'
		})
Admin_Schema.set('timestamps', true);
module.exports = mongoose.model('admin', Admin_Schema);