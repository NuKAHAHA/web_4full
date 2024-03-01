const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connection to MongoDB Atlas cloud database
mongoose.connect('mongodb+srv://nurkhaimuldin:kukanku@mymongodb.3nvjajl.mongodb.net/')
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch(err => console.error('Connection error:', err));

const { Schema, ObjectId } = mongoose;

// User schema
const userSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    email: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    is_admin: { type: Boolean, default: false }
});

// Middleware to hash password before saving
userSchema.pre('save', async function(next) {
    // Hash the password only if it's modified or new
    if (!this.isModified('password')) return next();

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // Replace the plain password with the hashed one
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});


userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

// Logs schema
const logsSchema = new Schema({
    user: { type: ObjectId, ref: 'User' },
    request_type: String,
    request_data: String,
    status_code: String,
    timestamp: { type: Date, default: Date.now },
    response_data: String
});

// User IP schema
const userIpSchema = new Schema({
    ip: String,
    user: { type: ObjectId, ref: 'User' }
});

const newTeamSchema = new Schema({
    Team: String,
    League: String,
    Founded: Number,
    FirstImage: String,
    TwoImage: String,
    ThreeImage: String
});

// Define models
const UserModel = mongoose.model('User', userSchema);
const LogsModel = mongoose.model('Logs', logsSchema);
const UserIpModel = mongoose.model('UserIp', userIpSchema);
const NewTeamModel = mongoose.model('NewTeam', newTeamSchema);

// Exports
module.exports = {
    UserModel,
    LogsModel,
    UserIpModel,
    NewTeamModel
};
