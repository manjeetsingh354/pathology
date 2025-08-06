const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_Schema =
	new Schema(
		{
			name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            password: {
				type: String
			},
            gender: {   
                type: String,
                required: true
		    },
            address: {   
                type: String
            }
		},
        {
            collection: 'user'
        })
User_Schema.set('timestamps', true);
module.exports = mongoose.model('user', User_Schema);