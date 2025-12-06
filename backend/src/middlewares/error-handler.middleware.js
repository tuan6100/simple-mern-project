export function errorHandler(err, req, res) {
    console.error(err)
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: Object.values(err.errors).map(e => e.message).join(', ')
        })
    }
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({
            error: 'ID không hợp lệ'
        })
    }
    if (err.code === 11000) {
        return res.status(400).json({
            error: 'Dữ liệu bị trùng lặp'
        })
    }
    if (err.name === 'StudentValidatorError') {
        return res.status(400).json({ error: err.message })
    }
    return res.status(500).json({
        error: 'Internal server error',
        detail: err.message
    })
}
