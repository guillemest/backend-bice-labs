const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/api/v1/obtenerUltimosValoresElementos', function ({}, res, next) {
  try {
    request.get(`https://www.indecon.online/last`, (err, resp, body) => {
      if (err) {
        return console.log(err);
      }
      const result = [];
      const objResult = JSON.parse(body);
      for (let property in objResult) {
        if (objResult.hasOwnProperty(property)) {
          result.push(objResult[property]);
        }
      }

      return res.status(resp.statusCode).send(result);
    });
  } catch (e) {
    next(e);
  }
});

router.get('/api/v1/obtenerValoresPorElemento', function (req, res, next) {
  try {
    const elemento = req.query['key'];
    if (elemento) {
      request.get(
        `https://www.indecon.online/values/${elemento}`,
        (err, resp, body) => {
          if (err) {
            return console.log(err);
          }
          return res.status(resp.statusCode).send(JSON.parse(body));
        }
      );
    } else {
      return res.status(400).send({ error: 'Bad Request' });
    }
  } catch (e) {
    next(e);
  }
});

router.get('/api/v1/obtenerValoresPorElementoFecha', function (req, res, next) {
  try {
    const elemento = req.query['key'];
    const fecha = req.query['date'];

    if (elemento && fecha) {
      request.get(
        `https://www.indecon.online/date/${elemento}/${fecha}`,
        (err, resp, body) => {
          if (err) {
            return console.log(err);
          }
          return res.status(resp.statusCode).send(JSON.parse(body));
        }
      );
    } else {
      return res.status(400).send({ error: 'Bad Request' });
    }
  } catch (e) {
    next(e);
  }
});

router.get('/api/v1/obtenerElementos', function ({}, res, next) {
  try {
    request.get(`https://www.indecon.online/last`, (err, resp, body) => {
      if (err) {
        return console.log(err);
      }
      const result = [];
      const objResult = JSON.parse(body);
      for (let property in objResult) {
        if (objResult.hasOwnProperty(property)) {
          result.push(property);
        }
      }

      return res.status(resp.statusCode).send(result);
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
