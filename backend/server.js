import express from 'express';
import data from './data1.js';
import cors from 'cors';
const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.get('/api/products/:id',(req,res)=>{
  
    const product = data.products.find((x) => x._id === req.params.id);
    // console.log(product)
    if(product){
        res.send(product);

    }else{
        res.status(404).send({message: 'Không Tìm Thấy Sản Phẩm'})
    }
})
app.get('/api/products',(req,res)=>{
    res.send(data.products);
})   
app.get('/',(req,res) => {
    res.send(""); 
});
const post = process.env.PORT || 5000;
app.listen(post,()=>{
    console.log(`serve at  http://localhost:${post}`);
}) 