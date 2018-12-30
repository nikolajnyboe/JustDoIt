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

router.get('/api/users-current', catchErrors(userController.getCurrentUser));
router.get('/api/users/:_id', catchErrors(userController.getUserById));
router.get('/api/users', catchErrors(userController.getUsers));
router.post('/api/users', catchErrors(userController.register));
router.patch('/api/users/:_id', catchErrors(userController.update));
router.delete('/api/users/:_id', catchErrors(userController.deleteUser));

router.get('/api/projects/:_id', catchErrors(projectController.getProjectById));
router.get('/api/users/:_id/projects', catchErrors(projectController.getProjectsByOwnerId));
router.post('/api/projects', authController.isLoggedIn, catchErrors(projectController.createProject));
router.patch('/api/projects/:_id', authController.isLoggedIn, catchErrors(projectController.updateProject));
router.delete('/api/projects/:_id', authController.isLoggedIn, catchErrors(projectController.deleteProject));

router.get('/api/projects/:_id/tasks', authController.isLoggedIn, catchErrors(taskController.getTasksByProject));
router.get('/api/users/:_id/tasks', authController.isLoggedIn, catchErrors(taskController.getTasksByAssignedUser));
router.post('/api/tasks', authController.isLoggedIn, catchErrors(taskController.createTask));
router.patch('/api/tasks/:_id', authController.isLoggedIn, catchErrors(taskController.update));
router.delete('/api/tasks/:_id', authController.isLoggedIn, catchErrors(taskController.deleteTask));

router.post('/api/labels', authController.isLoggedIn, catchErrors(labelController.create));
router.delete('/api/labels/:_id', authController.isLoggedIn, catchErrors(labelController.delete));

module.exports = router;