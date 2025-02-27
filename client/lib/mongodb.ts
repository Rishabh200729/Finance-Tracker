import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

let client ;
let clientPromise : Promise<MongoClient>;

client = new MongoClient(uri , options);
clientPromise = client.connect();

export default clientPromise;
