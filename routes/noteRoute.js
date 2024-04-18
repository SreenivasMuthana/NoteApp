const { Router } = require("express");

const router = Router()

const NOTE_SCHEMA=require("../models/note_schema")
//HTTP METHOD -------> GET
router.get("/create-note",(req,res)=>{
    res.render("notes/create-note",{title:"create note"})
})

router.get("/:id",async (req,res)=>{
    let payload=await NOTE_SCHEMA.findOne({_id:req.params.id}).lean()
    res.render("notes/note",{title:"single note", payload})
})

//HTTP POST
router.post("/create-note", async(req,res)=>{
    await NOTE_SCHEMA.create(req.body);
    res.redirect("/",302,{});
});

router.get("/edit/:id",async (req,res)=>{
    let editPayload=await NOTE_SCHEMA.findOne({_id:req.params.id}).lean()
    res.render("notes/edit-note",{title:"edit note", editPayload})
})

//!Put request
router.put("/edit/:id", async (req,res)=>{
    try{
        let editPayload = await NOTE_SCHEMA.findOne({_id:req.params.id});
        editPayload.title=req.body.title;
        editPayload.category=req.body.category;
        editPayload.description=req.body.description;

        //!save in db
        editPayload.save();
        res.redirect("/",302,{})
    } catch(err){
        console.log(err);
    }
})

//!delete Operation
router.delete("/delete-note/:id", async(req,res)=>{
    await NOTE_SCHEMA.deleteOne({_id:req.params.id})
    res.redirect("/",302,{})
})

module.exports = router