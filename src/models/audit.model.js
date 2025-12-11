import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "userType", 
        },

        userType: {
            type: String,
            required: true,
            enum: ["Admin", "Doctor", "FDO"],
        },

        entityType: {
            type: String,
            required: true,
            enum: [
                "Admin",
                "Doctor",
                "FDO",
                "Patient",
                "Department",
                "Appointment",
                "Prescription",
                "Billing",
            ],
        },

        entityId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        actionType: {
            type: String,
            required: true,
            enum: ["CREATE", "UPDATE", "DELETE", "LOGIN", "LOGOUT"],
        },

        details: {
            type: String,
            default: "",
        },

    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
