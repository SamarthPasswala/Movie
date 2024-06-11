const { Router } = require("express");
const { indexPage, insertData, viewPage, addPage, editData, deleteData, editPage } = require("../controller/control");
const upload = require("../middleware/extension");

const router = Router()

router.get('/', indexPage)
router.get('/view', viewPage)
router.get('/add', addPage)
router.get('/edit', editPage)
router.post('/insertData', upload, insertData)
router.get('/editData/:id', editData)
router.get('/deleteData/:id', deleteData)


module.exports = router