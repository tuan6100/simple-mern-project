import { useState, useEffect } from 'react'
import './App.css'
import {useDebounce} from "./hooks/useDebounce.js"
import {fetchGetStudents, fetchSearchStudentsByName} from "./apis/student.api.js"
import {SearchBar} from "./components/SearchBar.jsx"
import {StudentList} from "./components/StudentList.jsx"
import {AddStudentForm} from "./components/AddStudentForm.jsx"


function App() {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    const [sortAsc, setSortAsc] = useState(true)

    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    useEffect(() => {
        const apiCall = debouncedSearchTerm.trim()
            ? fetchSearchStudentsByName(debouncedSearchTerm)
            : fetchGetStudents()

        apiCall.then(data => {
            setStudents(Array.isArray(data) ? data : [])
        }).catch(err => {
            console.error("Lỗi fetch:", err)
            setError(err.message || "Lỗi tải dữ liệu")
            setStudents([])
        }).finally(() => setLoading(false))
    }, [debouncedSearchTerm])

    const handleAddSuccess = (newStudentData) => {
        setStudents(prev => [...prev, newStudentData])
    }

    const handleUpdateSuccess = (updatedStudent) => {
        setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s))
    }

    const handleDeleteSuccess = (deletedId) => {
        setStudents(prev => prev.filter(s => s.id !== deletedId))
    }

    const sortedStudents = [...students].sort((a, b) => {
        function getLastName(fullName) {
            if (!fullName) return ""
            const parts = fullName.trim().split(/\s+/)
            return parts[parts.length - 1]
        }
        const lastA = getLastName(a.name);
        const lastB = getLastName(b.name);
        const cmpLast = lastA.localeCompare(lastB, "vi", { sensitivity: "base" });
        if (cmpLast !== 0) return sortAsc ? cmpLast : -cmpLast;
        return sortAsc
            ? a.name.localeCompare(b.name, "vi", { sensitivity: "base" })
            : b.name.localeCompare(a.name, "vi", { sensitivity: "base" });
    })


    return (
        <>
            <h1>
                Danh sách học sinh
            </h1>
            <SearchBar
                onSearch={setSearchTerm}
            />
            <button onClick={() => setSortAsc(prev => !prev)}>
                Sắp xếp theo tên: {sortAsc ? 'A → Z' : 'Z → A'}
            </button>
            <StudentList
                students={sortedStudents}
                loading={loading}
                error={error}
                onUpdate={handleUpdateSuccess}
                onDelete={handleDeleteSuccess}
            />

            <AddStudentForm onAdd={handleAddSuccess}/>
        </>
    )
}

export default App
