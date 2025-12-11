import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

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

    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },

    diseaseDescription: {
        type: String,
        required: [true, "Disease description is required"],
        trim: true
    },

    status: {
        type: String,
        enum: ["pending", "checked", "cancelled"],
        default: "pending"
    },

    isEmergency: {
        type: Boolean,
        default: false
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FDO",
        required: true
    },

    appointmentNumber: {
        type: Number,
        required: true,
        unique: true
    }

}, {
    timestamps: true
});

// Auto appointment number generate
appointmentSchema.pre("validate", async function (next) {
    if (this.isNew) {
        const lastAppointment = await Appointment.findOne().sort({ appointmentNumber: -1 });
        this.appointmentNumber = lastAppointment ? lastAppointment.appointmentNumber + 1 : 1;
    }
    next();
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
