import express from "express";
import Libro from "../models/libro.js";

const router = express.Router();
// Crear un libro
router.post("/new", async (req, res) => {
    const libro = new Libro({
        titulo: req.body.titulo,
        autor: req.body.autor,
        paginas: req.body.paginas
    });

    try {
        await libro.save();
        res.json(libro);
    } catch (error) {
        res.status(500).send("Error al guardar el libro");
    }
})
// Listar libros
router.get("/list", async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).send("Error al obtener los libros");
    }
})


router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const libro = await Libro.findById(id);
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).send("Libro no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error al buscar el libro");
    }  
})

//Eliminar libro

router.delete("/:id", async (req, res) => {
    try {
        const libro = await Libro.findByIdAndDelete(req.params.id);

        if (!libro) {
            return res.status(404).json({
                mensaje: "Libro no encontrado"
            });
        }

        res.json({
            mensaje: "Libro eliminado correctamente"
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar libro"
        });
    }
});

// actualizar libro
router.put("/:id", async (req, res) => {
    try {

        const libro = await Libro.findByIdAndUpdate(
            req.params.id,
            {
                titulo: req.body.titulo,
                autor: req.body.autor,
                paginas: req.body.paginas
            },
            { new: true }
        );

        if (!libro) {
            return res.status(404).json({
                mensaje: "Libro no encontrado"
            });
        }

        res.json(libro);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar libro"
        });
    }
    
});


export default router