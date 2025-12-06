import {useState} from "react"
import {fetchAddStudent} from "../apis/student.api.js"
import './AddStudentForm.css'

export function AddStudentForm({ onAdd }) {
    const [adding, setAdding] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [student, setStudent] = useState({
        name: "",
        age: "",
        clazz: ""
    })

    async function handleSubmit() {
        setSubmitting(true)
        try {
            const res = await fetchAddStudent(student)
            let created = res?.data ?? res
            if (!created || typeof created !== "object") {
                created = { ...student }
            }
            if (!created.address) created.address = student.address
            onAdd(created)
            setAdding(false)
        } catch (err) {
            alert(err.message || err)
        } finally {
            setStudent({
                name: "",
                age: "",
                clazz: ""
            })
            setSubmitting(false)
        }
    }

    async function handleInput(e) {
        const { id, value } = e.target
        setStudent({ ...student, [id]: value })
    }

    return (
        <div className="add-student">
            <button onClick={() => setAdding(true)}>Thêm học sinh mới</button>

            {adding && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Thêm học sinh</h2>

                        <div className="form-grid">
                            <div>
                                <label>Họ và tên:</label>
                                <input id="name" value={student.name} onChange={handleInput} />
                            </div>

                            <div>
                                <label>Tuổi:</label>
                                <input id="age" value={student.age} onChange={handleInput} />
                            </div>

                            <div>
                                <label>Lớp:</label>
                                <input id="clazz" value={student.clazz} onChange={handleInput} />
                            </div>

                        </div>
                        <div className="modal-buttons">
                            <button onClick={handleSubmit}
                                    disabled={submitting}>{submitting ? 'Đang lưu...' : 'Lưu'}
                            </button>
                            <button
                                onClick={() => setAdding(false)}
                                disabled={submitting}>Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
