const Express= require('express')
const Router = Express.Router()
const TaskController=require('../Controllers/taskcontroller')

Router.get('/gettasks',TaskController.getTask)

Router.post('/createtask',TaskController.createtask)

Router.put('/updatetask',TaskController.updatetask)

Router.delete('/deletetask',TaskController.deletetask)

module.exports=Router