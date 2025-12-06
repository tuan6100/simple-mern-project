import mongoose from 'mongoose';

/**
 * Bài 1: Thiết lập Dự án
 */
setTimeout(function () {
    mongoose.connect('mongodb://localhost:27017/student_db')
        .then(() => console.log("Đã kết nối MongoDB thành công"))
        .catch(err => console.error("Lỗi kết nối MongoDB:", err))
}, 5000)
mongoose.set('debug', true);
