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

router.get('/api/user/:_id', userController.getUserById);
router.get('/api/user-current', userController.getCurrentUser);
router.get('/api/users', userController.getUsers);
router.post('/api/register', userController.register);
router.patch('/api/user/:_id', userController.update);
router.delete('/api/user/:_id', userController.deleteUser);

router.get('/api/project/:_id', projectController.getProjectById);
router.get('/api/projects/:_id', projectController.getProjectsByOwnerId);
router.post('/api/project', authController.isLoggedIn, projectController.createProject);
router.patch('/api/project/:_id', authController.isLoggedIn, projectController.updateProject);
router.delete('/api/project/:_id', authController.isLoggedIn, projectController.deleteProject);

router.get('/api/tasks-by-project/:projectId', authController.isLoggedIn, taskController.getTasksByProject);
router.get('/api/tasks-by-user/:userId', authController.isLoggedIn, taskController.getTasksByAssignedUser);
router.post('/api/task/:projectId', authController.isLoggedIn, catchErrors(taskController.createTask));
router.patch('/api/task/:_id', authController.isLoggedIn, catchErrors(taskController.update));
router.delete('/api/task/:_id', authController.isLoggedIn, taskController.deleteTask);

router.post('/api/label', authController.isLoggedIn, labelController.create);
router.delete('/api/label/:_id', authController.isLoggedIn, labelController.delete);

module.exports = router;