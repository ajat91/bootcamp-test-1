const express = require("express")
const compression = require('compression')
const bodyParser = require("body-parser")
const _where = require("lodash.where")
const sql = require('mssql')
const app = express()
app.use(bodyParser.json())
app.use(compression())
const server = app.listen(3000, a =>{
    console.log('listening at http://localhost:3000')
})

app.use('/', express.static('./public'));

app.use(express.urlencoded())

app.get('/',function(req,res){
    res.send('Hello World')
})

var DB_CONFIG ={
    user: "bootcamp",
    password: "Bootcamp*123",
    server: "206.189.80.195",
    database:"bootcamp"
}

var nomer3 = function nomer3(req,res,next){
    res.setHeader('Content-Type','application/json')
    new sql.ConnectionPool(DB_CONFIG).connect().then(pool => {
        return pool.query('SELECT "Region",COUNT(*) AS "TotalCountry" FROM bootcamp_test_ajat group by "Region","Country"')
    }).then(result =>{
        return res.send(result.recordset)
    }).catch(err =>{ 
        return res.send(err)
    })
}
app.get('/api/jawaban/3',nomer3)



var nomer4 = function nomer4(req,res,next){
    res.setHeader('Content-Type','application/json')
    new sql.ConnectionPool(DB_CONFIG).connect().then(pool => {
        return pool.query('SELECT "Country", "Year", max("AvgTemperature") AS "maxTemp", min("AvgTemperature") AS "minTemp"FROM bootcamp_test_ajat WHERE "Country" IN (\'Canada\',\'Malaysia\',\'Turkey\') AND "Year"=\'2018\' GROUP BY "Country","Year"')
    }).then(result =>{
        return res.send(result.recordset)
    }).catch(err =>{ 
        return res.send(err)
    })
}
app.get('/api/jawaban/4',nomer4)

var nomer5 = function nomer5(req,res,next){
    res.setHeader('Content-Type','application/json')
    new sql.ConnectionPool(DB_CONFIG).connect().then(pool => {
        return pool.query('SELECT "Region",COUNT(*) AS "jml_kota" FROM bootcamp_test_ajat group by "Region","Country"')
    }).then(result =>{
        return res.send(result.recordset)
    }).catch(err =>{ 
        return res.send(err)
    })
}
app.get('/api/jawaban/5',nomer5)


app.post('/simpan-data', function(req, res){
    console.log(req.body)

    const { Region, Country, State, City, Month, Day, Year, AvgTemperature } = req.body; 

    new sql.ConnectionPool(DB_CONFIG).connect().then(pool => {
        const sql = `
            INSERT into bootcamp_test_ajat 
            (Region, Country, State, City, Month, Day, Year, AvgTemperature) 
            values ('${Region}', '${Country}', '${State}', '${City}', '${Month}', '${Day}', '${Year}', '${AvgTemperature}');`
        console.log(sql)
        return pool.query(sql)
    }).then(result => {
        return res.send(result)
    }).catch(err => {
        return res.send(err)
    })
    

})
