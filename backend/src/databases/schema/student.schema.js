import mongoose from "mongoose";

/**
 * Bài 1: Thiết lập Dự án
 * @type {Schema}
 */
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Tên không được rỗng'],
        trim: true,
        validate: {
            validator: v => v && v.trim().length > 0,
            message: 'Tên không được rỗng'
        }
    },
    age: {
        type: Number,
        required: [true, 'Tuổi phải là số dương'],
        min: [1, 'Tuổi phải là số dương']
    },
    clazz: {
        type: String,
        required: [true, 'Lớp không được rỗng'],
        trim: true,
        validate: {
            validator: v => v && v.trim().length > 0,
            message: 'Lớp không được rỗng'
        }
    }
}, { collection: 'students' });

const Student = mongoose.model('Student', studentSchema);
export default Student;

