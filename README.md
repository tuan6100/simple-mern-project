# QUẢN LÝ HỌC SINH

## Mô tả
Ứng dụng web quản lý học sinh cơ bản sử dụng công nghệ [M](https://www.mongodb.com/)[E](https://expressjs.com/)[R](https://reactjs.org/)[N](https://nodejs.org/) 
và [Swagger](https://swagger.io/) để tài liệu hóa API tự động.

## Danh sách RESTful API
| Method   | Prefix URL      | Endpoint            | Mô tả                            |
|----------|-----------------|---------------------|----------------------------------|
| GET      | /api/students   | /                   | Lấy danh sách tất cả học sinh    |
| GET      | /api/students   | /search?name=kw     | Tìm kiếm học sinh theo tên       |
| POST     | /api/students   | /                   | Thêm học sinh mới                |
| PUT      | /api/students   | /:id                | Cập nhật thông tin học sinh      |
| DELETE   | /api/students   | /:id                | Xóa học sinh theo ID             |
| GET      | /api-docs       | /ui                 | Mở Swagger UI trên trình duyệt   |
