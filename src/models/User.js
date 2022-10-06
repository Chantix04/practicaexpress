const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },  
    isActive: {
        type: Boolean,
        required:true,
        default: true
    },
    role:{
        type: Array
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
},{
    timestamps:true,
    versionKey:false
});
UserSchema.methods.toJSON = function(){
    const { password,_id, ... user } = this.toObject();
    
    user.uid = _id;
    
    return user;
    
}
module.exports =  model('users', UserSchema)