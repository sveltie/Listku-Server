require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// Security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Swagger API
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocumentation = YAML.load('./swagger.yaml');

// MongoDB
const connectDB = require('./utils/connect');

// User Authentication
const authenticateUser = require('./middleware/authentication.middleware');

// Router
const authRouter = require('./routes/auth.route');
const tasksRouter = require('./routes/tasks.route');

// Error handler
const notFoundMiddleware = require('./middleware/not-found.middleware');
const errorHandlerMiddleware = require('./middleware/error-handler.middleware');

// Server port
const port = process.env.PORT || 5000;

// Rate limit middleware
app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
    res.send('<h1>Task API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', authenticateUser, tasksRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is running on port ${port} || http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    };
};

start();