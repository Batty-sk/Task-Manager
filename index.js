const Express= require('express')
const cors=require('cors')
const Router=require('./Routers/taskrouter')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = Express()

const mongoDB=require('mongoose')

dotenv.config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoDB.connect(`mongodb+srv://${username}:${password}@cluster0.wa3ihmp.mongodb.net/Task?retryWrites=true&w=majority`,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,}).then(()=>{console.log('Database Connection Establish Successfully!')}).catch(error=>{
        console.log('error has been occured!',error)
    })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(Express.static('build'))
app.use('/api',Router)
app.use('*',Express.static('build'))


app.listen(3000,()=>{
    console.log('Server has been started')
}
)

