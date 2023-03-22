// Importando a conexão com o banco de dados
const database = require('../database')

// Criando função que vai realizar a inserção de dados na tabela registro no banco de dados
exports.deletePartida = (req, res) => {
  
  // Armazenando o comando SQL numa const
  const comando = `DELETE FROM registro WHERE partida_id = $1`;
  const valores = [req.params.partida_id];

  // Utilizando a instrução database.query do pacote pg para executar o comando no banco de dados
  database
    .query(comando, valores)
    .then((resultado) => {
        res.status(200).send(
            {
                message: `Partida ${req.params.partida_id} removida com sucesso!`,
                data: resultado.rows 
            }
        );
    })
    .catch((erro) => {
      res.status(500).send({erro: erro});
    })
}