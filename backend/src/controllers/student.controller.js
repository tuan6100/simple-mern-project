import Student from "../databases/schema/student.schema.js"
import {StudentDto} from "../dtos/student.dto.js";

/**
 * Bài 1: Hiển thị Danh sách Học sinh
 *
 * @param req - Chứa thams số truy vấn
 * @param res - Trả về danh sách học sinh
 * @returns {Promise<StudentDto[]>}
 */
export async function getStudents(req, res) {
    try {
        const students = await Student.find()
        const responseBody = students.map(s => (
            new StudentDto(
                s._id.toString(),
                s.name,
                s.age,
                s.clazz
            )
        ))
        res.json(responseBody)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/**
 * Bài 2: Thêm Chức năng Thêm Học sinh Mới
 * @param req - chứa thông tin học sinh mới
 * @param res - trả về học sinh vừa tạo
 * @param next - Hàm chuyển tiếp đến middleware xử lý lỗi
 * @returns {Promise<StudentDto[]>}
 */
export async function createStudent(req, res, next) {
    try {
        const name = req.body.name
        const age = parseInt(req.body.age)
        const clazz = req.body.clazz
        const newStudent = new Student({
            name,
            age,
            clazz
        })
        await newStudent.save()
        res.status(201).json(
            new StudentDto(
                newStudent._id.toString(),
                newStudent.name,
                newStudent.age,
                newStudent.clazz
            )
        )
    } catch (e) {
        next(e)
    }
}

/**
 * Bài 3: Thêm Chức năng Chỉnh Sửa Thông Tin Học sinh
 * @param req - Trường được cập nhật
 * @param res - Thông tin học sinh đã được cập nhật
 * @param next - Hàm chuyển tiếp đếp middleware xử lý lỗi
 * @returns {Promise<StudentDto[]>}
 */
export async function updateStudent(req, res, next) {
    try {
        const studentId = req.params.id
        const dynamicUpdateFields = {}
        if (req.body.name !== undefined) {
            dynamicUpdateFields.name = req.body.name
        }
        if (req.body.age !== undefined) {
            dynamicUpdateFields.age = parseInt(req.body.age)
        }
        if (req.body.clazz !== undefined) {
            dynamicUpdateFields.clazz = req.body.clazz
        }
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { $set: dynamicUpdateFields },
            { new: true, runValidators: true }
        )
        if (!updatedStudent) {
            res.status(404).json({ error: 'Không tìm thấy học sinh với ID đã cho' })
        }
        res.status(200).json(
            new StudentDto(
                updatedStudent._id.toString(),
                updatedStudent.name,
                updatedStudent.age,
                updatedStudent.clazz
            )
        )
    } catch (e) {
       next(e)
    }
}

/**
 * Bài 4: Thêm Chức năng Xóa Học sinh
 * @param req - Chứa ID học sinh cần xóa
 * @param res - Trả về thông báo xóa thành công
 * @param next - Hàm chuyển tiếp đến middleware xử lý lỗi
 * @returns {Promise<{message: string}>}
 */
export async function deleteStudent(req, res, next) {
    try {
        const studentId = req.params.id
        const deletedStudent = await Student.findByIdAndDelete(studentId)
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Không tìm thấy học sinh với ID đã cho' })
        }
        res.status(200).json({ message: 'Xóa học sinh thành công' })
    } catch (e) {
        next(e)
    }
}

/**
 * Bài 5: Tìm Kiếm Học sinh theo Tên
 * @param req - Chứa tham số truy vấn tên
 * @param res - Trả về danh sách học sinh khớp tên
 * @returns {Promise<StudentDto[]>}
 */
export async function searchStudentsByName(req, res) {
    try {
        const nameQuery = req.query.name
        const students = await Student.find(
            { name: { $regex: nameQuery, $options: 'i' } },
        )
        const responseBody = students.map(s => (
            new StudentDto(
                s._id.toString(),
                s.name,
                s.age,
                s.clazz
        )))
        res.json(responseBody)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}