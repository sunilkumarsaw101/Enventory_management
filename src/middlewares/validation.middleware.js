import {body, validationResult} from 'express-validator';

export const validateRequest=async (req,res, next)=>{
    //  //validate data
    //  let errors =[];
    //  let {name ,desc, price}= req.body;
    //  if(!name || name.trim()==''){
    //    errors.push('Name is required');
    //  }
    //  if(!desc || desc.trim()==''){
    //    errors.push('Description is required');
    //  }
    //  if(!price || parseFloat(price)<1){
    //      errors.push('Price must be a positive value');
    //  }


    //validation using express validator.
    //1.set up rules for validation.
     const rules=[
      body('name').notEmpty().withMessage("Name is required"),
      body('desc').notEmpty().withMessage('Description is required'),
       body('price').isFloat({gt:0}).withMessage('Price should be a positive value'),
      // body("imageUrl").isURL().withMessage('Invalid url')
      body("imageUrl").custom((value,{req})=>{
          if(!req.file){
            throw new Error('Image is required');
          }
          return true;
      })
     ]
    //2.run those rules.
   await Promise.all(rules.map((rule)=>rule.run(req)
    ))

    //3.check if there are any errors after running the rules.
     var validationErrors= validationResult(req);
     
     //4.if there is any error return the error
     if(!validationErrors.isEmpty()){
      console.log(validationErrors);
       return res.render('new-product',{errorMessage: validationErrors.array()[0].msg});
     }
     
     next();
}