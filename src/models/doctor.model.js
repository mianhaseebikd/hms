import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const doctorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true
    },
     username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },
    cnic: {
        type: String,
        required: [true, "CNIC number is required"],
        unique: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        default: "doctor",
        enum: ["doctor"] 
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: [true, "Department is required"]
    },
    specialty: {
        type: String,
        default: ""
    },
    consultationFee: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        default: ""
    },
    profileImage: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: true
    },
    refreshToken: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

// Password hashing
doctorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//  Password compare
doctorSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// Generate Access Token
doctorSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        { 
            id: this._id, 
            fullName: this.fullName, 
            email: this.email, 
            role: this.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

// Generate Refresh Token
doctorSchema.methods.generateRefreshToken = function() {
    const refreshToken = jwt.sign(
        { id: this._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    this.refreshToken = refreshToken;
    this.save();
    return refreshToken;
};

export const Doctor = mongoose.model('Doctor', doctorSchema);
