const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ) return res.status(400).json({ msg: errors.array() });

    try {
        const project = new Project(req.body);

        project.owner = req.user.id;

        project.save();
        res.json(project);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has ocurred');
    }
};

exports.getProjects = async (req, res) => {
    
    try {
        const projects = await Project.find({ owner: req.user.id }).sort({ createdAt: -1 });
        res.json({ projects });

    } catch (error) {
        console.log(error);
        res.status(500).send('An error has ocurred');
    }
};

exports.updateProject = async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ) return res.status(400).json({ msg: errors.array() });

    const { name } = req.body;
    const newProject = new Project;

    if( name ) {
        newProject.name = name;
    }

    try {
        let project = await Project.findById(req.params.id);

        if(!project) return res.status(400).json({ msg: 'Project not found' });

        if(project.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized'});

        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });

        res.json({ project });

    } catch (error) {
        console.log(error);
        res.status(500).send('An error has ocurred');
    }
    
};

exports.deleteProject = async (req, res) => {
    
    try {
        let project = await Project.findById(req.params.id);
        
        if(!project) return res.status(400).json({ msg: 'Project not found' });

        if(project.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized'});

        project = await Project.findOneAndRemove({ _id: req.params.id });

        res.json({ msg: 'Project removed successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).send('An error has ocurred');
    }
    
}