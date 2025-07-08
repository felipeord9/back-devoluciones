const ProductService = require("../services/productService");

const findAllProducts = async (req, res, next) => {
  try {
    const data = await ProductService.find();
    res.status(200).json({
      status: "OK",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const findOneProduct = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const data = await ProductService.findOne(id);

    res.status(200).json({
      status: "OK",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { body } = req
    console.log(body)
    
    for(let product of body) {
      await ProductService.create({
        id: product.codigo,
        description: product.descripcion,
        um: product.um
      })
    }

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { body } = req
    console.log(body)
    
    for(let product of body) {
      const prod = await ProductService.findOne(product.codigo)
      await prod.update({
        description: product.descripcion,
        um: product.um
      })
    }

    res.status(201).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = {
  findAllProducts,
  findOneProduct,
  createProduct,
  updateProduct,
};
