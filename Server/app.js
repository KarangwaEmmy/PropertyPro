// import express from 'express';

const express = require('express')
const app = express();

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => res.send('Hello World! THIS IS THE MESSAGE'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))