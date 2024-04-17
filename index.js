// const express= require('express');
import express from "express";
import ProductController from './src/controllers/product.controller.js'
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import {validateRequest} from './src/middlewares/validation.middleware.js';
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";
const server = express();


server.use(express.static('public'));

server.use(cookieParser());
//to use setLastVisit middleware in all the request
// server.use(setLastVisit);
//configure the session.
server.use(session({
    secret:'SecretKey',
    resave: false,
    saveUninitialized:true,
    cookie: {
        secure:false
       
    }
}));

server.use(express.urlencoded({extended:true}));

server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(),'src','views'));

server.use(ejsLayouts);


//create instance of ProductController.
const productController= new ProductController();
const userController= new UserController();
// server.use(express.static('src/views'));

server.get('/register', userController.getRegister );
server.get('/login', userController.getLogin );
server.post('/register', userController.postRegister);
server.post('/login', userController.postLogin);

server.get('/', setLastVisit, auth, productController.getProducts);
server.get('/new', auth, productController.getAddform);
server.get('/update-product/:id', auth, productController.getUpdateProductView);
server.post('/delete-product/:id', auth, productController.deleteProduct)
server.post('/', auth, uploadFile.single('imageUrl'), validateRequest, productController.addNewProduct);
server.post('/update-product', auth, productController.updateProduct );

server.get('/logout', userController.logout);


server.listen(3400);
console.log('server is listening on port 3400');