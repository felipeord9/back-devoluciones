const ReturnService = require('../../services/ReturnService')
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/evidencias/'); // Ruta personalizada
  },
  filename: (req, file, cb) => {
    const filename = req.body.name || 'evidence';
    cb(null, `${filename}.webm`);
  }
});

/* const upload = multer({ storage }); */
const upload = multer({ limits: { fileSize: 1024 * 1024 * 500 } ,  dest: 'uploads/' });

router.post('/', upload.single('evidence'), (req, res) => {
  console.log('entro a la ruta');
  const tipo = req.body.tipo;
  const id = req.body.id;

  console.log(`tipo: ${tipo} - id: ${id}`);

  if (!req.file) {
    return res.status(400).send('No se recibió ningún archivo');
  }

  const ruta = `/evidencias`
  const inputPath = req.file.path;
  var outputFileName;
  if(tipo === 'Foto'){
    outputFileName = `id_${id}.jpg`;
  }else if(tipo === 'Video'){
    outputFileName = `id_${id}.webm`;
  }
  const outputPath = path.join(ruta, outputFileName)
  /* const outputPath = inputPath.replace('.webm', '.mp4'); */

  try {
    //crear el directorio si no esta o utilizar el que ya esta
    if (!fs.existsSync(ruta)) {
        console.log('se crea la carpeta');
        fs.mkdirSync(ruta, { recursive: true });
    }

    console.log('la carpeta ya esta creada');
    fs.renameSync(inputPath, outputPath);
    //fs.unlinkSync(inputPath); // Elimina el archivo .webm temporal
    console.log('archivo guardado');
    const change = {
        evidence: 1
    }
    ReturnService.update(id, change)
    .then(()=>{
        res.status(200).send('Video subido y guardado como .webm correctamente');
    })
    .catch(()=>{
        res.status(500)
    })
  } catch (err) {
    console.error('Error general:', err);
    // ⚠️ Limpieza de emergencia si se captura un error
    fs.unlink(inputPath, () => {});
    console.log(err)
    res.status(500).send('Error al procesar el video');
  }
});

// GET único video
router.get('/file', (req, res) => {
  const { folder, filename } = req.query;

  console.log(`si llegaron los parametros`)

  if (!folder || !filename) {
    return res.status(400).send('Faltan parámetros');
  }

  const safeFolder = path.basename(folder); // evita rutas maliciosas
  const safeFilename = path.basename(filename);
  const videoPath = path.join('/evidencias', folder, filename);

  fs.access(videoPath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Video no encontrado');
    }
    res.sendFile(videoPath);
  });
});

router.get('/obtener-archivo/:archivo', (req, res) => {
  const { archivo } = req.params;

  if (!archivo) {
    console.log('faltan archivos')
    return res.status(400).send('Faltan parámetros');
  }

  const videoPath = path.join('C:/evidencias', archivo);

  /* fs.access(videoPath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Video no encontrado');
    }
    res.sendFile(videoPath);
  }); */
  fs.stat(videoPath, (err, stats) => {
    if (err || !stats.isFile()) {
      return res.sendStatus(404);
      /* return res.status(500).json({ ok: false, mensaje: 'Archivo no encontrado' }); */
    }else{
      res.sendFile(videoPath);
    }

  });
});

const FILES_DIR = '/evidencias'

router.get('/consult/evidence/:archivo', (req, res) => {
  const { archivo } = req.params;

  if (!archivo) {
    console.log('faltan archivos')
    return res.status(400).send('Faltan parámetros');
  }

  const videoPath = path.join('C:/evidencias', `${archivo}.jpg`);
  const videoPath2 = path.join('C:/evidencias', `${archivo}.webm`);

  fs.access(videoPath, fs.constants.F_OK, (err) => {
    if (err) {
      fs.access(videoPath2, fs.constants.F_OK, (err) => {
        if(err){
          return res.status(404).send('Video no encontrado');
        }
        res.sendFile(videoPath2);
      })
    }
    res.sendFile(videoPath);
  });
});

router.use('/videos', express.static('/evidencias'));

module.exports=router
