import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Patient full name is required"],
        trim: true
    },
    email: {  // Primary email
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    cnic: {
        type: String,
        required: [true, "CNIC number is required"],
        unique: true,
        trim: true
    },
    fatherCnic: {
        type: String,
        default: "",
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of Birth is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        index: true,
        trim: true
    },
    serialNumber: {
        type: String,
        unique: true,
        required: true
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        default: ""
    },
    allergies: {
        type: [String],
        default: []
    },
    emergencyContact: {
        name: { type: String, default: "" },
        phone: { type: String, default: "" }
    },
    address: {
        type: String,
        default: ""
    },
    photo: {
        type: String,
        default: ""
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FDO",
        required: true
    },
    lastVisit: {
        type: Date,
        default: null
    },
    visitCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// To generate unique serialNumber if not present
patientSchema.pre("save", async function (next) {
    if (!this.serialNumber) {
        this.serialNumber = `PAT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    next();
});

// Method to increment visit count and update last visit
patientSchema.methods.incrementVisit = function () {
    this.visitCount += 1;
    this.lastVisit = new Date();
    return this.save();
};

// Indexes for fast search
patientSchema.index({ phone: 1 });
patientSchema.index({ cnic: 1 });
patientSchema.index({ fatherCnic: 1 });
patientSchema.index({ email: 1 }); // email search

export const Patient = mongoose.model("Patient", patientSchema);
