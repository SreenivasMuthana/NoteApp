const mongoose  = require("mongoose");

const NoteSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        category:{
            type:String,
            required:true,
            enum:["frontend","backend","machine_learning","database","cloud"],
                },
        description: {
                    type :String
                }
            },
            { timestamps: true}
        )
module.exports=mongoose.model("note",NoteSchema)

