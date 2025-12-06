import {useState} from "react";

export function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("")

    function handleSearchChange(e) {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    }

    return (
        <div className="search-container" style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Tìm kiếm theo tên..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                    padding: '8px',
                    width: '300px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
            />
        </div>
    )
}