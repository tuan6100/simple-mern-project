import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000/api/students",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export function extractErrorMessage(err) {
    if (err?.response?.data?.error) return err.response.data.error;
    if (err?.response?.data?.message) return err.response.data.message;
    if (err?.message) return err.message;
    return "Unexpected error";
}
