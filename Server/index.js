const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

//middlewares
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174'],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// my middlewares
const logger = async(req,res,next) =>{
  console.log("log: info ",req.method , req.url)
  next()
}

const verifyToken = async(req,res, next) =>{
  const token = req.cookies?.token
  console.log("token in the middleware ", token)
  if(!token){
    return res.status(401).send({message: "unauthorized access"})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
    //error
    if(err){
      return res.status(401).send({message:"unauthorized"})
    }
    //if token valid then it would be decoded 
    console.log("value in the token", decoded)
    req.user = decoded
      next()

  })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yncfr23.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
 


    const panjabiCollection = client.db("tusharDB").collection("panjabi");
    const userCollection = client.db("tusharDB").collection("users");





    //JWT            auth related operation
    app.post('/jwt',logger, async(req,res)=>{
      const user = req.body
      console.log("user for token",user)

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET ,{expiresIn: '1h'})
      
      res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })
      .send({success: true})
    })


    app.post('/logout',logger,async(req,res)=>{
      const user = req.body
      console.log("logging out ",user)
      res.clearCookie('token',{maxAge:0}).send({success: true})
    })


        //registration of new user from reg or login page
        app.post("/users", async(req,res)=>{
          const user = req.body
              // insert if user doesn't exist already
              const query = {email: user.email}
              const existingUser = await userCollection.findOne(query)
              if(existingUser){
                return res.send({message: "user already exists", insertedId: null})
              }
              else{
                const result = await userCollection.insertOne(user); 
                res.send(result)

              }
      })

      app.get("/users", async(req,res)=> {
        const result = await userCollection.find().toArray()
        res.send(result)
      } )
//making an admin
      app.patch("/users/admin/:id", async(req,res)=> {
        const id = req.params.id;
        const role = req.body
        const filter = {_id: new ObjectId(id)};
        const updatedDoc = {
          $set: role
          // {role: "admin"}
          // {role: "user"}
        }
        const result = await userCollection.updateOne(filter,updatedDoc)
        res.send(result)
      })




//query verifyToken,
    app.get("/myProducts",logger, async(req,res)=>{
      //req.user (=decoded) is coming from verifyToken
      console.log("user in the valid token", req.user)
    // verify email
      // if(req.query.email !== req.user.email){
      //   return res.status(403).send({message:'forbidden access'})
      // }

      let query = {}
      const options = {
        projection: { product_type: 1, image: 1, price:1 },
      };
      if(req.query.email){
        query = {email: req.query.email}
        console.log(query)
      }
      const result = await panjabiCollection.find(query,options).toArray()
      res.send(result)
    })
    

    //post from add page
    app.post("/products",logger, async(req,res)=>{
        const aPanjanbi = req.body
            console.log("new panjabi", aPanjanbi)
            // Insert the defined document into the panjabiCollection
            const result = await panjabiCollection.insertOne(aPanjanbi); 
            res.send(result)
    })


//read a data from details page
    app.get("/details/:id",logger, async(req,res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const product= await panjabiCollection.findOne(query)
      res.send(product)
  })

// pagination count
app.get("/productCount",async(req,res)=>{
  const count = await panjabiCollection.estimatedDocumentCount()
  res.send({count})
})
// pagination count from all product page
app.get("/allProducts/productCount",async(req,res)=>{
  const count = await panjabiCollection.estimatedDocumentCount()
  res.send({count})
})



//read all products from home page
app.get("/products",logger, async(req,res)=>{
  const page = parseInt(req.query.page)
  const size = parseInt(req.query.size) 
    console.log("getting ",page,size)

    const result = await panjabiCollection.find()
    .skip(page*size)
    .limit(size)
    .toArray()
    res.send(result)
})
//read all products from all products page

app.get("/allProducts",logger, async(req,res)=>{
  const cursor = panjabiCollection.find()
  const result = await cursor.toArray()
  res.send(result)
})

//read all my products from My List page
// app.get("/products/:email", async(req,res)=>{
//     console.log(req.query.email)
//     const email = req.params.email
//     // let query = {}
//     const query = {email: email}
//     console.log(req)
//     const options = {
//       projection: { product_type: 1, image: 1, price:1 },
//     };
  
//     const result = await  panjabiCollection.find(query,options).toArray()
//     res.send(result)
// })




//update from update page:
          // read a product from my list page
          app.get("/update/:id",logger, async(req,res)=>{
            const id = req.params.id
            const query = {_id: new ObjectId(id)}
            const product= await panjabiCollection.findOne(query)
            res.send(product)
          })
  app.put("/update/:id",logger, async(req,res)=>{
    const id = req.params.id
    const product = req.body
    console.log(id)

    const filter = {_id: new ObjectId(id)}
    //make a doc if no such doc exists (because it is put, not patch)
    const options = {upsert: true }
    const updatedProduct = {
        $set: {
            image : product.image,
            product_type : product.product_type,
            size  : product.size,
            fabric : product.fabric,
            color : product.color,
            price : product.price,
            occasion : product.occasion,
            email : product.email,
            user_name : product.user_name,
        }
    }
    const result = await panjabiCollection.updateOne(filter,updatedProduct,options)
    res.send(result)
  })

//delete operation from my list page:
      app.delete("/products/:id",logger, async(req,res)=>{
        const id = req.params.id
        console.log('plz delete', id)
        const query = {_id: new ObjectId(id)}
        const result = await panjabiCollection.deleteOne(query)
        res.send(result)
      })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
   
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get("/",(req,res)=>{
    res.send("This is a (get) response from server")
})

app.listen(port,()=>{
    console.log(`Msg from server side: server is running on port ${port}`)
})