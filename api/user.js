const router = require('express').Router();
const userController = require('./_controller/userController')

router.post("/", async (req, res) => {
    const result = await userController.create(req);
    res.json(result);
});


router.get('/', async (req,res)=>{
    const result = await userController.list(req);
    res.json(result);
})


router.put('/', async (req,res)=>{
    const result = await userController.update(req);
    res.json(result);
})

router.delete('/', async (req,res)=>{
    const result = await userController.delete(req);
    res.json(result);
})

module.exports = router;