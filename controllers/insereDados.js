// Importando a conexão com o banco de dados
const database = require('../database')

// Criando função que vai realizar a inserção de dados na tabela de times e pontuacao no banco de dados
exports.insertEquipe = (req, res) => {
  
  // Armazenando o comando SQL numa const
  const insertTimes = `INSERT INTO times (nome) VALUES ('${req.body.time}');`;
  const insertPontuacao = `INSERT INTO pontuacao (nome) VALUES ('${req.body.time}');`;
  // Utilizando a instrução database.query do pacote pg para executar o comando no banco de dados
  database
    .query(insertTimes + insertPontuacao)
    .then((resultado) => {
        res.status(200).send(
            {
                message: `Time ${req.body.time} inserido com sucesso!`,
                data: resultado.rows 
            }
        );
    })
    .catch((erro) => {
      res.status(500).send({erro: erro});
    })
}

exports.insertPartida = (req, res) => {
  
  const time_1 = req.body.time_1;
  const placar_1 = req.body.placar_1;
  const time_2 = req.body.time_2;
  const placar_2 = req.body.placar_2;

  // Armazenando os comandos SQL em const
  const insertPartida = `INSERT INTO registro (data, time_1, placar_1, time_2, placar_2)
    VALUES (now(), '${time_1}', ${placar_1}, '${time_2}', ${placar_2});`
  
  const updatePontuacaoTime1 = `UPDATE pontuacao
    SET pontuacao = pontuacao + 
    CASE 
      WHEN ${placar_1} > ${placar_2} THEN 3
      WHEN ${placar_1} = ${placar_2} THEN 1
      ELSE 0
    END
    , vitorias = vitorias +   
    CASE 
      WHEN ${placar_1} > ${placar_2} THEN 1
      ELSE 0
    END
    , empates = empates +
    CASE
      WHEN ${placar_1} = ${placar_2} THEN 1
      ELSE 0
    END
    , derrotas = derrotas +
    CASE 
      WHEN ${placar_1} < ${placar_2} THEN 1
      ELSE 0
    END
    WHERE nome IN ('${time_1}');
  `;

  const updatePontuacaoTime2 = `UPDATE pontuacao
    SET pontuacao = pontuacao + 
    CASE 
      WHEN ${placar_2} > ${placar_1} THEN 3
      WHEN ${placar_2} = ${placar_1} THEN 1
      ELSE 0
    END
    , vitorias = vitorias +   
    CASE 
      WHEN ${placar_2} > ${placar_1} THEN 1
      ELSE 0
    END
    , empates = empates +
    CASE
      WHEN ${placar_1} = ${placar_2} THEN 1
      ELSE 0
    END
    , derrotas = derrotas +
    CASE 
      WHEN ${placar_2} < ${placar_1} THEN 1
      ELSE 0
    END
    WHERE nome IN ('${time_2}');
  `;
  
  // Utilizando a instrução database.query do pacote pg para executar o comando no banco de dados
  database
    .query(insertPartida + updatePontuacaoTime1 + updatePontuacaoTime2)
    .then((resultado) => {
        res.status(200).send(
            {
                message: `Partida ${time_1} x ${time_2} inserida com sucesso!`,
                data: resultado.rows 
            }
        );
    })
    .catch((erro) => {
      res.status(500).send({erro: erro});
    })
}