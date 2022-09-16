import mongoose from "mongoose";

const dataBase=async()=>{
    await mongoose.connect('mongodb://localhost:27017/TokenUsers')
.then(()=>console.log('Connected to MongoDB...'))
.catch(err=>console.error('Could not connect to MongoDB...'))

}
export default dataBase