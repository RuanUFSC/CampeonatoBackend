const express = require('express');
const router = express.Router();
const controllerCriacao = require('../controllers/criaTabela');
const controllerConsulta = require('../controllers/consultaDados');
const controllerInsercao = require('../controllers/insereDados');
const controllerExclusao = require('../controllers/apagaDados');
const controllerAtualizacao = require('../controllers/atualizaDados');

router.post('/criar-tabela', controllerCriacao.createTables);
router.get('/consultar-times', controllerConsulta.getTimes);
router.get('/consultar-partidas', controllerConsulta.getPartidas);
router.get('/consultar-partidas-por-time/:time', controllerConsulta.getPartidasPorTime);
router.get('/consultar-ranking', controllerConsulta.getRanking);
router.get('/consultar-maior-placar', controllerConsulta.getMaiorPlacar);
router.post('/criar-equipe', controllerInsercao.insertEquipe);
router.post('/criar-partida', controllerInsercao.insertPartida);
router.delete('/apagar-partida/:partida_id', controllerExclusao.deletePartida);
router.put('/atualizar-partida/:partida_id', controllerAtualizacao.updatePartida);

module.exports = router;