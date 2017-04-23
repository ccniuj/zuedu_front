import path from 'path'
import Express from 'express'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'

import { match, RouterContext } from 'react-router'
import routes from '../routes'
import { serverRender } from '../actions'
import compression from 'compression'
const app = new Express()
const port = 3001

const compiler = webpack(webpackConfig)
//app.use(compression());//add this as the 1st middlewares
app.get('/', (req, res) => {
  res.redirect('https://docs.google.com/forms/d/e/1FAIpQLSeyyu5oBNCDEyqyIusL-f8gP-t1leEphzlEuHJC7jyOviuscA/viewform');
});
app.get('*.js',function(req,res,next){
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use(Express.static(path.join(__dirname, '..', 'public')))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const scriptSrcs = [
  '/static/bundle.js'
];

app.get('*', (req, res) => {
  const store = configureStore()
  const cookie = req.headers.cookie
  const params = req.url.split('/').slice(2)

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent
      const func = comp.fetchData 
                   ? comp.fetchData({ store, cookie, params }) 
                   : Promise.resolve()

      func.
      then(action => {
        if (action) {
          store.dispatch(action)
        }
        store.dispatch(serverRender())
      }).
      then(() => {
        let reduxState = encodeURI(JSON.stringify(store.getState()))
        let html = renderToString(
          <Provider store={store}>
            { <RouterContext {...renderProps}/> }
          </Provider>
        )
        res.render('index', { html, reduxState, scriptSrcs })
      })
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
