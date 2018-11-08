const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const listController = require('../controllers/listController');

router.get('/api/user/:_id', userController.getUserById);
router.get('/api/user-current', userController.getCurrentUser);
router.get('/api/users', userController.getUsers);
router.post('/api/register', userController.register);
router.delete('/api/user/:_id', userController.deleteUser);

router.post('/api/login', authController.login);
router.get('/api/logout', authController.logout);

router.get('/api/list/:_id', listController.getListById);
router.get('/api/lists/:_id', listController.getListsByOwnerId);
router.post('/api/list', authController.isLoggedIn, listController.createList);
router.delete('/api/list/:_id', authController.isLoggedIn, listController.deleteList);

module.exports = router;