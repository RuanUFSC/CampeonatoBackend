// Importando a conexão com o banco de dados
const database = require('../database')

// Criando função que vai realizar a consulta na tabela produto no banco de dados
exports.getTimes = (req, res) => {
  
  // Armazenando o comando SQL numa const
  const comando = `SELECT * FROM times`

  // Utilizando a instrução database.query do pacote pg para executar o comando no banco de dados
  database
    .query(comando)
    .then((resultado) => {
        res.status(200).send(
            {
                message: 'Os times cadastrados são os seguintes:',
                data: resultado.rows 
            }
        );
    })
    .catch((erro) => {
      res.status(500).send({erro: erro});
    })

  }

exports.getPartidas = (req, res) => {
  // Armazenando o comando SQL numa const
  const comando = `SELECT * FROM registro ORDER BY partida_id`

  database
      .query(comando)
      .then((resultado) => {
          res.status(200).send(
              {
                  message: 'As partidas registradas são as seguintes:',
                  data: resultado.rows 
              }
          );
      })
      .catch((erro) => {
        res.status(500).send({erro: erro});
      })

}

exports.getPartidasPorTime = (req, res) => {
  // Armazenando o comando SQL numa const
  const comando = `SELECT * FROM registro WHERE time_1 = $1 OR time_2 = $1`
  const valores = [req.params.time];
  console.log(valores)
  database
      .query(comando, valores)
      .then((resultado) => {
          res.status(200).send(
              {
                  message: `As partidas do time ${req.params.time} são as seguintes`,
                  data: resultado.rows 
              }
          );
      })
      .catch((erro) => {
        res.status(500).send({erro: erro});
      })

}

exports.getRanking = (req, res) => {
  // Armazenando o comando SQL numa const
  const comando = `SELECT * FROM pontuacao ORDER BY pontuacao DESC, vitorias DESC, derrotas ASC, empates DESC`

  database
      .query(comando)
      .then((resultado) => {
          res.status(200).send(
              {
                  message: 'O ranking atualmente é o seguinte:',
                  data: resultado.rows 
              }
          );
      })
      .catch((erro) => {
        res.status(500).send({erro: erro});
      })

}

exports.getMaiorPlacar = (req, res) => {
  // Armazenando o comando SQL numa const
  const comando = `SELECT * FROM registro ORDER BY placar_1 DESC`
  database
      .query(comando)
      .then((resultado) => {
          res.status(200).send(
              {
                  message: 'Os maiores placares registrados são:',
                  data: resultado.rows 
              }
          );
      })
      .catch((erro) => {
        res.status(500).send({erro: erro});
      })
}