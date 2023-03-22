// Importando a conexão com o banco de dados
const database = require('../database')

// Criando função que vai realizar a criação da tabela no banco de dados
exports.createTables = (req, res) => {
  
  // Armazenando o comando SQL numa const
  const createTableTime = `CREATE TABLE times (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
  );`

  const insertTableTimes = `INSERT INTO times (nome) VALUES
  ('Time A'),
  ('Time B'),
  ('Time C'),
  ('Time D'),
  ('Time E'),
  ('Time F'),
  ('Time G'),
  ('Time H'),
  ('Time I'),
  ('Time J');`

  const createTablePontuacao = `CREATE TABLE pontuacao(
    nome VARCHAR(50) PRIMARY KEY,
    vitorias INT NOT NULL DEFAULT 0,
    empates INT NOT NULL DEFAULT 0,
    derrotas INT NOT NULL DEFAULT 0,
    pontuacao INT NOT NULL DEFAULT 0
  );`

  const insertTablePontuacao = `INSERT INTO pontuacao(nome) VALUES
  ('Time A'),
  ('Time B'),
  ('Time C'),
  ('Time D'),
  ('Time E'),
  ('Time F'),
  ('Time G'),
  ('Time H'),
  ('Time I'),
  ('Time J');`

  const createTableRegistro = `CREATE TABLE registro (
    partida_id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    time_1 VARCHAR(50) NOT NULL,
    placar_1 INT NOT NULL,
    time_2 VARCHAR(50) NOT NULL,
    placar_2 INT NOT NULL
  );`

  // Utilizando a instrução database.query do pacote pg para executar o comando no banco de dados
  database.query(createTableTime + createTablePontuacao + createTableRegistro)
  database.query(insertTableTimes + insertTablePontuacao)
    .then(() => {
      res.status(200).send({message: 'Tabelas criadas com sucesso!'});
    })
    .catch((erro) => {
      res.status(500).send({erro: erro});
    })
}