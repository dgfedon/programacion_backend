import { Router } from "../deps.ts";
import { ProductHandler } from "../handlers/ProductHandler.ts";


const productRouter = new Router()
.get('/products', ProductHandler.getAll)
.get('/products/:id', ProductHandler.getById)
.post('/products',ProductHandler.create)
.put('/products/:id',ProductHandler.update)
.delete('/products/:id',ProductHandler.delete)

export {productRouter}