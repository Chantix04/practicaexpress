const {Schema, model} = require('mongoose');

const TasksSchema = Schema({ 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
}, {
 timestamps: true,
 versionKey: false
});

module.exports =  model('Tasks', TasksSchema)