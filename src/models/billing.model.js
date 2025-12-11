import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    doctorFee: {
        type: Number,
        required: true,
        default: 0
    },
    testsCharges: {
        type: Number,
        default: 0
    },
    medicineCharges: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FDO",
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Pre-save hook to calculate totalAmount
billingSchema.pre("save", function (next) {
    this.totalAmount = this.doctorFee + this.testsCharges + this.medicineCharges;
    this.updatedAt = new Date();
    next();
});

export const Billing = mongoose.model("Billing", billingSchema);