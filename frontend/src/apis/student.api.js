import axios from 'axios'
import { StudentsApiFactory } from '../../api-client/api'
import { extractErrorMessage } from './index.js'

const API_BASE_URL = `http://localhost:5000`
const client = StudentsApiFactory(undefined, API_BASE_URL, axios)
/**
 * Bài 1
 * @returns {Promise<Array.<{id: string, name: string, age: number, clazz: string}>>}
 * @throws {Error} - HTTP error khi fetch danh sách học sinh
 */
export async function fetchGetStudents() {
    try {
        const res = await client.apiStudentsGet()
        return res.data
    } catch (err) {
        throw new Error(`Lỗi khi truy vấn dữ liệu học sinh: ${extractErrorMessage(err)}`)
    }
}

/**
 * Bài 2
 * @param {{name:string, age:number|string, clazz:string}} student
 * @returns {Promise<{id: string, name: string, age: number, clazz: string}>}
 * @throws {Error} - HTTP error khi thêm học sinh mới
 */
export async function fetchAddStudent(student) {
    try {
        const payload = {
            name: student.name,
            age: Number(student.age),
            clazz: student.clazz,
        }
        const res = await client.apiStudentsPost(payload)
        return res.data
    } catch (err) {
        throw new Error(`Lỗi khi thêm học sinh: ${extractErrorMessage(err)}`)
    }
}

/**
 * Bài 3
 * @param {{id:string, name?:string, age?:number|string, clazz?:string}} student
 * @returns {Promise<{id: string, name: string, age: number, clazz: string}>}
 * @throws {Error} - HTTP error khi cập nhật học sinh
 */
export async function fetchUpdateStudent(student) {
    try {
        const id = student.id
        const payload = {
            name: student.name,
            age: student.age !== undefined ? Number(student.age) : undefined,
            clazz: student.clazz,
        }
        const res = await client.apiStudentsIdPut(id, payload)
        return res.data
    } catch (err) {
        throw new Error(`Lỗi khi cập nhật học sinh: ${extractErrorMessage(err)}`)
    }
}

/**
 * Bài 4
 * @param {string} studentId
 * @returns {Promise<void>}
 * @throws {Error} - HTTP error khi xóa học sinh
 */
export async function fetchDeleteStudent(studentId) {
    try {
        await client.apiStudentsIdDelete(studentId)
    } catch (err) {
        throw new Error(`Lỗi khi xóa học sinh: ${extractErrorMessage(err)}`)
    }
}

/**
 * Bài 5
 * @param name {string} tên học sinh cần tìm kiếm
 * @returns {Promise<Array<Student>>}
 */
export async function fetchSearchStudentsByName(name) {
    try {
        const res = await client.apiStudentsSearchGet(name)
        return res.data
    } catch (err) {
        throw new Error(`Lỗi khi tìm kiếm học sinh: ${extractErrorMessage(err)}`)
    }
}