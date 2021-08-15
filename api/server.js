let app = require('express')();
let BodyParser = require('body-parser');
let cors = require('cors');

app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

const server = app.listen(8000,()=>{
    console.log('Node server is runing...');
});

app.use('/users', require('./users'));
app.use('/artists',require('./artists'));
app.use('/products',require('./products'));

