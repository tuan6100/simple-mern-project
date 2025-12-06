import './StudentList.css'
import {useState} from "react";
import {fetchUpdateStudent, fetchDeleteStudent} from "../apis/student.api.js";

export function StudentList({ students, loading, error, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    function handleEditButtonClick(student) {
        setEditing({ ...student })
    }

    function handleEditChange(e) {
        const { name, value } = e.target;
        setEditing({ ...editing, [name]: value })
    }

    async function handleSaveChanges() {
        if (!editing) return
        if (!editing.id) {
            alert('Không thể cập nhật: thiếu id của học sinh.')
            return
        }
        setSubmitting(true)
        try {
            const updatedStudent = await fetchUpdateStudent(editing)
            if (onUpdate) {
                onUpdate(updatedStudent)
            }
            setEditing(null)
            alert("Cập nhật thành công!");
        } catch (err) {
            console.error(err);
            alert((err.message || err))
        } finally {
            setSubmitting(false)
        }
    }

    async function handleDeleteStudent(studentId, studentName) {
        if (!studentId) return
        alert(`Bạn có chắc chắn muốn xóa học sinh ${studentName} không?`)
        try {
            await fetchDeleteStudent(studentId)
            if (onDelete) {
                onDelete(studentId)
            }
            alert('Xóa học sinh thành công!')
        } catch (err) {
            console.error(err)
            alert(err.message || 'Không thể xóa học sinh')
        }
    }

    return (
        <div className="result-table">
            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p style={{ color: 'red' }}>{error.message || error}</p>}

            {!loading && (
                students && students.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Họ tên</th>
                            <th>Tuổi</th>
                            <th>Lớp</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map((s) => (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.age}</td>
                                <td>{s.clazz}</td>
                                <td>
                                    <button className="btn-edit"
                                            onClick={() => handleEditButtonClick(s)}
                                    >
                                        Sửa
                                    </button>
                                    <button className="btn-delete"
                                            onClick={() => handleDeleteStudent(s.id, s.name)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <h3 className="no-students">Chưa có học sinh nào</h3>
                )
            )}

            {editing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">Cập nhật thông tin</h2>
                        <div className="form-grid">
                            <div>
                                <label>Họ tên:</label>
                                <input
                                    name="name"
                                    value={editing.name}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div>
                                <label>Tuổi:</label>
                                <input
                                    name="age"
                                    value={editing.age}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div>
                                <label>Lớp:</label>
                                <input
                                    name="clazz"
                                    value={editing.clazz}
                                    onChange={handleEditChange}
                                />
                            </div>
                        </div>

                        <div className="modal-buttons">
                            <button onClick={handleSaveChanges} disabled={submitting}>
                                {submitting ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </button>
                            <button onClick={() => setEditing(null)} disabled={submitting}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}