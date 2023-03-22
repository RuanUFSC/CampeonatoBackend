const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const campeonatoRoutes = require('./routes/campeonatoRoutes')

const app = express();
app.use(bodyParser.json());

app.use("/campeonato", campeonatoRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});