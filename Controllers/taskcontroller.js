const model=require('../Models/Taskmodel')

const getTask= (req,res)=>{

    model.find()
    .then(allTasks => {
      console.log(allTasks)
      res.status(200).json({ tasks: allTasks });
    })
    .catch(error => {
      console.error('Error retrieving tasks:', error);
      res.status(500).json({ error:'Error retrieving task' });
    });
}
const createtask= async(req,res)=>{
    try {
        const { title, description, status, dueDate } = req.body;
        const newTask = new model({ title, description, status, dueDate });
        const savedTask = await newTask.save();

        res.status(200).json(savedTask);
      } 
      catch (error) {
        if (error.name === 'ValidationError') {
          // Extract the error message from the error object
          const errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
          res.status(400).json({ message: errorMessage });
        } 
        else {
          console.log('error', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
}

const updatetask = (req, res) => {
  const { _id, title, description, status, dueDate } = req.body;
  console.log("hereree buddy ", req.body);
  
  // Find the task by taskId and update its fields
  model.findByIdAndUpdate(_id, { title, description, status, dueDate }, { new: true })
    .then(updatedTask => {
      if (!updatedTask) {
        // If the task with the provided taskId is not found, return an error response
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    })
    .catch(error => {
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        console.log('error', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
};


const deletetask=(req,res)=>{
    const { _id } = req.body;
    // Find the task by taskId and delete it

    model.findByIdAndDelete(_id)
      .then(deletedTask => {
        if (!deletedTask) {
          return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: error });
      });
  };


module.exports={getTask,createtask,updatetask,deletetask}