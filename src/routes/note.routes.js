const express=require('express');
const router=express.Router();
const Note=require('../models/model');
router.get('/',async(req,res)=>{   
    const note=await Note.find();
    console.log(note);
    res.json(note);
});
router.post('/new-note',async(req,res)=>{
    const {title,description}=req.body;
    const newNote=new Note({title,description});
    await newNote.save();
    res.json({
        message:'Note saved'
    });
});
router.get('/render/:id',async(req,res)=>{
    const {id}=req.params;
    const note=await Note.findById(id);
    res.json(note);
});
router.put('/edit/:id',async(req,res)=>{
    const {id}=req.params;
    const {title,description}=req.body;
    await Note.findByIdAndUpdate(id,{title,description});
    res.json({
        message:'Note updated'
    });
});
router.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params;
    await Note.findByIdAndDelete(id);
    res.json({
        message:'Note deleted'
    });
});
module.exports=router;