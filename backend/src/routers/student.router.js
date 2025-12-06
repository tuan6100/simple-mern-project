import express from 'express'
import {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    searchStudentsByName
} from '../controllers/student.controller.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API for managing students
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - clazz
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the student
 *         name:
 *           type: string
 *           description: The name of the student
 *         age:
 *           type: number
 *           description: The age of the student
 *         clazz:
 *           type: string
 *           description: The class of the student
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         name: John Doe
 *         age: 21
 *         clazz: "12A1"
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Returns the list of all the students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: The list of the students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get('/', getStudents)

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: The student was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request (e.g., missing required fields)
 */
router.post('/', createStudent)

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student by the id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: The student was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: The student was not found
 *       500:
 *         description: Some error happened
 */
router.put('/:id', updateStudent)

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Remove the student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student id
 *     responses:
 *       200:
 *         description: The student was deleted
 *       404:
 *         description: The student was not found
 */
router.delete(':id', deleteStudent)

/**
 * @swagger
 * /api/students/search:
 *   get:
 *     summary: Search students by name
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name to search for
 *     responses:
 *       200:
 *         description: The list of students matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get('/search', searchStudentsByName)

export default router
