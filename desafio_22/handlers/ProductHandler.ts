import { RouterContext } from "https://deno.land/x/oak@v10.6.0/router.ts"
import { Context, helpers, MongoClient, ObjectId } from "../deps.ts"


const client = new MongoClient()

await client.connect('mongodb://localhost:27017')

const productDb = await client.database('ecommerce')
const productsCollection = await productDb.collection('products')

export class ProductHandler {
   static async getAll(ctx: RouterContext<any>) {
      ctx.response.type = 'json'
      const products = await productsCollection.find()



      ctx.response.body = products
   }

   static async getById(ctx: RouterContext<any, { id: string}>) {
      ctx.response.type = 'json'
      console.log(ctx?.params?.id);
      
   
      const product = await productsCollection.findOne({ _id:  new ObjectId(ctx.params.id)})

      console.log(product);
      

      if(!product) {
         ctx.response.status = 404
         ctx.response.body = 'Product not found'
         return
      }

      ctx.response.body = product
      return
   }

   static async create(ctx: RouterContext<any>) {
      ctx.response.type = 'json'
      if(!ctx.request.hasBody) {
         ctx.response.status = 400
         ctx.response.body = 'Body required'
         return
      } 

      const body = ctx.request.body()
      const values = await body.value

      if(!values.title) {
         ctx.response.status = 400
         ctx.response.body = 'Missing title'
         return
      }

      if(!values.price) {
         ctx.response.status = 400
         ctx.response.body = 'Missing price'
         return
      }

      const productToCreate = { 
         title: values.title,
         price: values.price,
      }

      const dbProd = await productsCollection.insertOne(productToCreate)

      ctx.response.body =  {
         id: dbProd,
         ...values
      }
   }

   static async update(ctx: RouterContext<any, { id: string}>) {
      ctx.response.type = 'json'
      if(!ctx.request.hasBody) {
         ctx.response.status = 400

         ctx.response.body = 'Body required'
         return
      } 

      const body = ctx.request.body()
      const values = await body.value

      console.log(values);
      
      console.log(ctx.params.id);
      


      const updatedProd = await productsCollection.updateOne({ _id: new ObjectId(ctx.params.id)}, {
         $set: { ...values },
      })


      ctx.response.body =  updatedProd
   }

   static async delete(ctx: RouterContext<any, { id: string}>) {
      ctx.response.type = 'json'

      const deleted = await productsCollection.deleteOne( { _id: new ObjectId(ctx.params.id)})
      ctx.response.body =  deleted
   }
}