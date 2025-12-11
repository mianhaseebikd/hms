import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Department name is required"],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: "", 
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: false
    }
}, {
    timestamps: true
});

export const Department = mongoose.model("Department", departmentSchema);
