const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')


const polygonApiUrl = "https://api.polygon.io/v3/reference"
const apiKey = "apiKey=DKR4tB_bjyNyoC3sd1xbqari57vPqKTA"

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})
app.get('/stock-info', (request, response) => {
  let ticker = request.query.ticker;
  let endPointTickers = "/tickers/";
  // https://api.polygon.io/v3/reference/tickers/AAPL?apiKey=DKR4tB_bjyNyoC3sd1xbqari57vPqKTA
  const tickersURL = `${polygonApiUrl}${endPointTickers}${ticker}?${apiKey}`

  axios.get(tickersURL).then(function (requestAxiosResponse) {
    let result = {
      "name": requestAxiosResponse.data.results.name,
      "description": requestAxiosResponse.data.results.description,
      "address": requestAxiosResponse.data.results.address
    }
    response.send(result);
  }).catch(function (error) {
    response.send(error);
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const rangeURL = "/range/1/year/2010-01-09/2023-01-09?adjusted=true&sort=asc&limit=120&"
const polygonApiV2 = "https://api.polygon.io/v2/aggs/ticker/"

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})
app.get('/stock-financials', (request, response) => {
  let ticker = request.query.ticker;

  // https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/year/2010-01-09/2023-01-09?adjusted=true&sort=asc&limit=120&apiKey=DKR4tB_bjyNyoC3sd1xbqari57vPqKTA
  const tickersURL2 = `${polygonApiV2}${ticker}${rangeURL}${apiKey}`

  axios.get(tickersURL2).then(function (requestAxiosResponse) {
    let result = {
      // "Date Range": "2010-01-09/2023-01-09",
      "stock High": requestAxiosResponse.data.results[0].h,
      "stock low": requestAxiosResponse.data.results[0].l,
    }
    response.send(result);
  }).catch(function (error) {
    response.send(error);
  })
})

