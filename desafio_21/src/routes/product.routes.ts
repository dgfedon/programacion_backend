import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const productRouter = Router();

productRouter.post('/', ProductController.createProduct);
productRouter.get('/', ProductController.getProducts);
productRouter.get('/:id', ProductController.getProduct);
productRouter.put('/:id', ProductController.updateProduct);
productRouter.delete('/:id', ProductController.deleteProduct);

export { productRouter };
