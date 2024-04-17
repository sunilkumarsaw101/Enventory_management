import path from "path";
import ProductModel from "../models/product.model.js";
export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    // console.log(products);
    // console.log('hello ',path.resolve());

    res.render("product", {
      products: products,
      userEmail: req.session.userEmail,
    });
    //   return res.sendFile(path.join(path.resolve(),'src','views', 'product.html'))
  }

  getAddform(req, res) {
    return res.render("new-product", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }

  getUpdateProductView(req, res, next) {
    //if product exist then return the view
    // console.log('hello',req.body);
    const productId = req.params.id;
    // console.log(productId);
    let productFound = ProductModel.getProductById(productId);
    // console.log(productFound);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    }
    //return product not found.
    else {
      res.status(404).send("Product not found");
    }
  }

  addNewProduct(req, res) {
    // console.log(req.body);
    console.log('hlo');
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    console.log(imageUrl);
    ProductModel.add(name, desc, price, imageUrl);

    let products = ProductModel.get();
    res.render("product", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }
  updateProduct(req, res) {
    // console.log(req.body);
    ProductModel.update(req.body);
    let products = ProductModel.get();
    res.render("product", { products: products, userEmail:req.session.userEmail });
  }

  deleteProduct(req, res) {
    console.log("object");
    const id = req.params.id;
    let productFound = ProductModel.getProductById(id);
    if (!productFound) {
      res.status(401).send("Product not found");
    }
    ProductModel.delete(id);
    let products = ProductModel.get();

    res.render("product", { products: products, userEmail:req.session.userEmail });
  }
}
