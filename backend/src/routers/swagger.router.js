import express from "express"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Student Management API',
            version: '1.0.0',
            description: 'API documentation for the Student Management project',
        },
        servers: [
            {
                url: 'http://localhost:5000/',
            },
        ],
    },
    apis: ['./src/routers/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
const router = express.Router()
router.get('', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

router.use('/ui', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


export default router
