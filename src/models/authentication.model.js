import mongoose from "mongoose";
import bcrypt from "bcrypt";

const authenticationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "userType" // Polymorphic reference: Admin / Doctor / FDO
    },
    userType: {
        type: String,
        required: true,
        enum: ["Admin", "Doctor", "FDO"]
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    cnic: {
        type: String,
        trim: true
    },
    idCard: {
        type: String,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
);


// Pre-save hook: hash password before saving
authenticationSchema.pre("save", async function (next) {
    if (!this.isModified("passwordHash")) return next();
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    next();
});

// Method to compare password
authenticationSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.passwordHash);
};

export const Authentication = mongoose.model("Authentication", authenticationSchema);