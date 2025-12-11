import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
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
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        default: "admin",
        enum: ["admin"] // Only admin allowed
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
},
 {
    timestamps: true
}
);

// Password hashing before saving
adminSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Method to Compare Passwords
adminSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

// Method to Generate JWT
adminSchema.methods.generateAccessToken = function () {
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
}

// Method to Generate Refresh Token
adminSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id,
        },

        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );
}

export const Admin = mongoose.model('Admin', adminSchema);

