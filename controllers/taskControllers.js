const { json } = require('body-parser');
const Task = require('../models/task');
const jwt = require('jsonwebtoken');

require("dotenv").config();


// const authenticateToken = require('./middleware/authenticateToken'); // Assuming you save the middleware in a file

exports.getAllTasks = async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.secretKey); 
      const userId = decoded._id;
      const tasks = await Task.find({ user: userId });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  

  exports.getTaskById = async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.secretKey); 
      const userId = decoded._id;
  
      // Find the task by its ID and owner.
      const task = await Task.findOne({ _id: req.params.id, user: userId });
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  

  exports.createTask = async (req, res) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.secretKey); 
      const userId = decoded._id;
      console.log(req.body);
      const newTask = new Task(req.body);
  
      await newTask.save();
  
      res.status(201).json({task: newTask});
    } catch (error) {
      res.status(500).json({ error: 'Server error' ,error});
    }
  };


  // exports.updateTask = async (req, res) => {
  //   try {
  //     const token = req.header('Authorization')?.replace('Bearer ', '');
  //     const decoded = jwt.verify(token, process.env.secretKey); 
  //     const userId = decoded._id;

  //     console.log(req.body);
  
  //     const { title, category, description, dueDate , priority, status, completed } = req.body;
  
  //     // Find and update the task by its ID and owner.
  //     const task = await Task.findOneAndUpdate(
  //       { _id: req.params.id, owner: userId },
  //       { title, category, description, dueDate, priority, status, completed }
  //     );
  
  //     if (!task) {
  //       return res.status(404).json({ error: 'Task not found' });
  //     }
  
  //     res.status(200).json(task);
  //   } catch (error) {
  //     res.status(500).json({ error: 'Server error' });
  //   }
  // };

  exports.updateTask = async (req, res) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      const decoded = jwt.verify(token, process.env.secretKey); 
      const userId = decoded._id;
  
      console.log(req.body);
  
      const { title, category, description, dueDate, priority, status, completed } = req.body;
  
      // Ensure you have imported the Task model at the beginning of your file.
      // const Task = require('../models/task');
  
      // Find and update the task by its ID and owner.
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: userId }, // Assuming you have an 'owner' field in your Task model.
        { title, category, description, dueDate, priority, status, completed },
        { new: true } // This option returns the updated task.
      );
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  

  exports.deleteTask = async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.secretKey); 
      const userId = decoded._id;

      const task = await Task.findOneAndRemove({ _id: req.params.id , user:userId });

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  