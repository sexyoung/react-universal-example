import path from "path";
import React from 'react';
import express from 'express';
import { match, RoutingContext } from 'react-router';
import { renderToString } from 'react-dom/server';

import { routes } from './routes';

var port = 5000;
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.get("*", (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    } if (renderProps){
      const markup = renderToString(<RoutingContext {...renderProps} />);
      res.render('index', { markup });
    } else {
      console.warn("404");
      res.sendStatus(404);
    }
  });
})


app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  瀏覽器打開 http://%s:%s/ 即可看見.", "localhost", port)
  }
})

// server.listen(5000);
console.log(`Server running at http://localhost:${port}/`);