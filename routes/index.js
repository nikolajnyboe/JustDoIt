const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');
const labelController = require('../controllers/labelController');
const {catchErrors} = require('../helpers/errorHandling');

router.post('/api/login', authController.login);
router.get('/api/logout', authController.logout);

router.get('/api/users/:_id', userController.getUserById);
router.get('/api/users/current', userController.getCurrentUser);
router.get('/api/users', userController.getUsers);
router.post('/api/users', userController.register);
router.patch('/api/users/:_id', userController.update);
router.delete('/api/users/:_id', userController.deleteUser);

router.get('/api/projects/:_id', projectController.getProjectById);
router.get('/api/users/:_id/projects', projectController.getProjectsByOwnerId);
router.post('/api/projects', authController.isLoggedIn, projectController.createProject);
router.patch('/api/projects/:_id', authController.isLoggedIn, projectController.updateProject);
router.delete('/api/projects/:_id', authController.isLoggedIn, projectController.deleteProject);

router.get('/api/projects/:_id/tasks', authController.isLoggedIn, taskController.getTasksByProject);
router.get('/api/users/:_id/tasks', authController.isLoggedIn, taskController.getTasksByAssignedUser);
router.post('/api/tasks', authController.isLoggedIn, catchErrors(taskController.createTask));
router.patch('/api/tasks/:_id', authController.isLoggedIn, catchErrors(taskController.update));
router.delete('/api/tasks/:_id', authController.isLoggedIn, taskController.deleteTask);

router.post('/api/labels', authController.isLoggedIn, labelController.create);
router.delete('/api/labels/:_id', authController.isLoggedIn, labelController.delete);

module.exports = router;