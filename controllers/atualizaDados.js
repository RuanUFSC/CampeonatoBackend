// Importando a conexão com o banco de dados
const database = require('../database')

// Criando função que vai realizar a inserção de dados na tabela produto no banco de dados
exports.updatePartida = (req, res) => {
  
  // Armazenando o comando SQL numa const
  const comando = `
    UPDATE registro 
    SET placar_1 = $1, placar_2 = $2
    WHERE partida_id = $3`;

  const valores = [
      req.body.placar_1, 
      req.body.placar_2,
      req.params.partida_id
  ];

  console.log(valores)
  // Utilizando a instrução database.query do pacote pg para executar o comando no banco de dados
  database
    .query(comando, valores)
    .then((resultado) => {
        res.status(200).send(
            {
                message: `Produto ${req.body.nome} atualizado com sucesso!`,
                data: resultado.rows 
            }
        );
    })
    .catch((erro) => {
      res.status(500).send({erro: erro});
    })
}