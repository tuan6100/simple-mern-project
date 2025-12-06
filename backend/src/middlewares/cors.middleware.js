import cors from "cors";

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
];
export const corsConfig = cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
        callback(new Error("Not allowed by CORS"))
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
});