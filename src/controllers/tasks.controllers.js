const tasks = require("../models/Task");

const ctrlTasks = {};

ctrlTasks.getTasks = async  (req,res) => { //request handler || manejador de peticiones
    const Task = await tasks.find()
    return res.json({
        msg: 'GET - getTasks',
        Task
    });
}

// Controlador para crear una nueva tarea
ctrlTasks.postTasks = async (req, res) => {
    const { title, description } = req.body;

    // Instanciar una nueva tarea
    const nuevaTarea = new tasks({
        title,
        description
    });

    try {
        // Guardar tarea en la base de datos
        const tarea = await nuevaTarea.save();
        return res.json('La tarea fue guardada con éxito');
    } catch (error) {
        console.log(error)
    }
};
// Controlador para actualizar una tarea
ctrlTasks.putTasks = async (req, res) => {
    const id = req.params.id;
    const { title, description, ...otroDatos } = req.body;

    if (!id || !description || !title) {
        return res.status(400).json({
            msg: 'No viene id en la petición',
        });
    };

    try {
        const tareaActualizada = await tasks.findByIdAndUpdate(id, { title, description })

        return res.json({
            msg: 'Tarea actualizada correctamente',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg: 'Error al actualizar la tarea'
        })
    }
};
//Controlador para eliminar una tarea (eliminación lógica)
ctrlTasks.deleteTasks = async (req,res) => { //request handler || manejador de peticiones
    const id = req.params.id 
   try {
    await tasks.findByIdAndUpdate(id, {isActive: false})
    return res.json('Tarea eliminada correctamente.');
   } catch (err){
        console.log(err.message)
        return res.status(500).json({
            msg: "Error al eliminar la tarea."
        });
    }

};

module.exports= ctrlTasks;