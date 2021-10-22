const Task = require('../models/task.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllTasks = async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

const getTask = async (req, res) => {
    const { 
        user: { userId },
        params: { id: taskId },
    } = req;

    const task = await Task.findOne({
        _id: taskId,
        createdBy: userId,
    });

    if (!task) {
        throw new NotFoundError(`No task exist with the id ${taskId}`);
    };

    res.status(StatusCodes.OK).json({ task });
};

const createTask = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const task = await Task.create(req.body);
    res.status(StatusCodes.CREATED).json({ task });
};

const updateTask = async (req, res) => {
    const {
        body: { task, description },
        user: { userId },
        params: { id: taskId }
    } = req;

    if (task === '' || task.length === 0) {
        throw new BadRequestError('Task field cannot be empty');
    };

    const newTask = await Task.findByIdAndUpdate(
        { _id: taskId, createdBy: userId },
        req.body,
        { new: true, runValidators: true}
    );

    if (!newTask) {
        throw new NotFoundError(`No task exist with the id ${taskId}`);
    };

    res.status(StatusCodes.OK).json({ newTask });
};

const deleteTask = async (req, res) => {
    const {
        user: { userId },
        params: { id: taskId }
    } = req;

    const task = await Task.findByIdAndRemove({
        _id: taskId,
        createdBy: userId
    });

    if (!task) {
        throw new NotFoundError(`No task exist with the id ${taskId}`);
    };

    res.status(StatusCodes.OK).send(`Successfully delete task with the id ${taskId}`);
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};