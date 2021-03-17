const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { projectId } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ msg: `Doesn't exist a project with id ${projectId}`});

        if(project.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized'});

        const task = new Task(req.body);
        
        await task.save();
        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('An error has ocurred');
    }

};

exports.getTasks = async (req, res) => {
    const { projectId } = req.query;

    try {
        const project = await Project.findById(projectId);

        if (!project) return res.status(404).json({ msg: `Doesn't exist a project with id ${projectId}`});

        if(project.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized'});

        const tasks = await Task.find({ projectId }).sort({ createdAt: -1 });
        
        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).send('An error has ocurred');
    }
};

exports.updateTask = async (req, res) => {
    try {        
        const { name, state, projectId } = req.body;
        
        const project = await Project.findById(projectId);
        
        if(!project) return res.status(404).json({ msg: `Doesn't exist a project with id ${projectId}`});

        let task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({ msg: `Doesn't exist a task with id ${req.params.id}`});

        if(project.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized'});

        const newTask = {};
        newTask.name = name;
        newTask.state = state;

        task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true });

        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('An error has ocurred');
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { projectId } = req.query;
        const project = await Project.findById(projectId);
        if(!project) return res.status(404).json({ msg: `Doesn't exist a project with id ${projectId}`});

        let task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({ msg: `Doesn't exist a task with id ${req.params.id}`});

        if(project.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized'});

        await Task.findOneAndDelete({ _id: req.params.id });
        
        res.json({ msg: 'Task removed successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).send('An error has ocurred');
    }
};