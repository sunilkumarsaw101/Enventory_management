export default class ProductModel {
  constructor(_id, _name, _desc, _price, _imageUrl) {
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }

  static get() {
    return product;
  }

  static add(name, desc, price, imageUrl) {
    let newPro = new ProductModel(
      product.length + 1,
      name,
      desc,
      price,
      imageUrl
    );
    product.push(newPro);
  }

  static update(productObj) {
    const index = product.findIndex((prod) => {
      return prod.id == productObj.id;
    });
    product[index] = productObj;
  }

  static delete(id) {
    const index = product.findIndex((prod) => {
      return prod.id == id;
    });
    product.splice(index, 1);
    // console.log("this is product after delete", product);
  }

  static getProductById(productId) {
    return product.find((product) => product.id == productId);
  }
}

var product = [
  new ProductModel(
    1,
    "product1",
    "this is product 1",
    1000,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfA-ixomPNoqO-etGGn9v757mstnJC_GUzomSCroxSQ-MNOIN3ZrjPBTOip0T7Uc9wg0U&usqp=CAU"
  ),
  new ProductModel(
    2,
    "product2",
    "this is product 2",
    2000,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfA-ixomPNoqO-etGGn9v757mstnJC_GUzomSCroxSQ-MNOIN3ZrjPBTOip0T7Uc9wg0U&usqp=CAU"
  ),
  new ProductModel(
    3,
    "product3",
    "this is product 3",
    3000,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfA-ixomPNoqO-etGGn9v757mstnJC_GUzomSCroxSQ-MNOIN3ZrjPBTOip0T7Uc9wg0U&usqp=CAU"
  ),
  new ProductModel(
    4,
    "product4",
    "this is product 4",
    4000,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfA-ixomPNoqO-etGGn9v757mstnJC_GUzomSCroxSQ-MNOIN3ZrjPBTOip0T7Uc9wg0U&usqp=CAU"
  ),
];
