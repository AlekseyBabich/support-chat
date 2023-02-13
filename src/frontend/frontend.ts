import next from 'next'
import path from 'path'
import { parse } from 'url'
import Koa from 'koa'
import koaPinoLogger from 'koa-pino-logger'
import pinoLogger from 'pino'
import { exitOnEnter } from '@src/frontend/util/exit-on-enter'




const scriptName = path.parse( __filename ).name

async function main() {

  const frontendEnv = process.env.FRONTEND_ENV ?? 'dev'

  const koaServerPort =
    process.env.FRONTEND_ENV ? Number( process.env.FRONTEND_ENV ) : 8080

  const nextApp = next( {
    // implicit conf: ./next.backend.js
    dev: frontendEnv == 'dev',
    dir: `${ __dirname }`
  } )
  await nextApp.prepare()
  const nextAppRequestHandler = nextApp.getRequestHandler()

  const koaApp = new Koa()
    .use( koaPinoLogger( { name: `${ scriptName }-koa`, level: 'info' } ) )
    .use( async ( ctx ) => {
      await nextAppRequestHandler( ctx.req, ctx.res, parse( ctx.url, true ) )
    } )
  const log = pinoLogger( { name: `${ scriptName }-main`, level: 'debug' } )


  const koaServer = koaApp.listen( koaServerPort, () => {
    log.info( `Koa server is running at http://localhost:${ koaServerPort }` )
  } )
  while ( !await exitOnEnter() ) {
  }
  koaServer.close( ( err: any ) => log.error( err ) )
  await nextApp.close()
}

main().catch( console.dir )


/*  const log = pinoLogger({name: `${scriptName}-main`, level: 'debug'})
  log.info({version})*/




