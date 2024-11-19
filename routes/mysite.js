const express = require("express");

//Traemos routador de express
const router = express.Router();

router.get("/",(req,res)=>{
    res.render("mysite",{layout:"main"});
});
module.exports = router;