import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    diseaseDescription: {
        type: String,
        required: true,
        trim: true
    },
    medicines: [
        {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
            duration: { type: String, required: true },
            instructions: { type: String, default: "" }
        }
    ],
    tests: [
        {
            testName: { type: String, required: true },
            instructions: { type: String, default: "" }
        }
    ],
    notes: {
        type: String,
        default: ""
    },
    nextCheckup: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Pre-save hook to update `updatedAt`
prescriptionSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

export const Prescription = mongoose.model("Prescription", prescriptionSchema);
