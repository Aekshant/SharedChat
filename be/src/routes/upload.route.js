const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { updateProfilePicture } = require('../services/user.service');

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// API Route
router.post('/uploads', upload.single('profilePicture'), (req, res) => {

    console.log("file upload api called" , req.body, req.file);
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    updateProfilePicture(req.body.userid, req.file.path);


    res.json({
        message: "File uploaded successfully",
        filePath: `/uploads/${req.file.filename}`
    });
});

module.exports = router;
