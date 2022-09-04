const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const sequelize = require('./models/model')
const cors = require('cors')
const PORT = 5000;
const router = require('./routes/router')



app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api', router)


sequelize.sequelize.sync()
    .then(result=> {
    app.listen(PORT, () => console.log(`Start on ${PORT} port`));
    })
    .catch(err=> console.log(err));
