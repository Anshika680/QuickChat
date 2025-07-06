//import mongoose from 'mongoose';

//console.log(process.env.MONGODB_URI);
//function connect(){
  //  mongoose.connect(process.env.MONGODB_URI)
   // .then(()=>{
     //   console.log("Connected to mongodb");
    //}).catch((err)=>{
      //  console.log(err);
    //});

//}

//export default connect;

// Example: create a test collection and insert a document
import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({ name: String });
const Test = mongoose.model('Test', testSchema);

async function connect() {
    await mongoose.connect(process.env.MONGODB_URI);
    await Test.create({ name: 'Hello' }); // This will create the DB and collection
    console.log('Connected and test document inserted');
}

export default connect;