import { Application } from "./deps.ts";
import { productRouter } from "./src/routes/ProductRoutes.ts";


const app = new Application();


app.use(productRouter.routes())
app.use(productRouter.allowedMethods())

app.listen({ port: 3000 });
console.log("Server on localhost:3000");
