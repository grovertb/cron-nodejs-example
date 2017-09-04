'use strict'


const config      = require('dt.config'),
      daemonLater = require('later')

      // logger = require('./utils/logger'),

const Errores = {
  'Red' : 'Error de Red, no se pudo establecer comunicación con el servidor de facturactiva responsable de enviar documentos electrónicos'
}

const WSURL_SUMARIES  = config.get('daily:sumaries:wsUrl'),
      ltSumaries      = config.get('daily:sumaries:laterSchedule'),
      WSURL_TICKET    = config.get('daily:ticket:wsUrl'),
      ltTicket        = config.get('daily:ticket:laterSchedule'),
      WSURL_COMMUN    = config.get('daily:communicationOfFall:wsUrl'),
      ltCommun        = config.get('daily:communicationOfFall:laterSchedule')

/* Global Variables*/
const APP = {
  timerFunction: 'setInterval'
}


/*
 * Configure later for time calculations based on local time
 */
daemonLater.date.localTime()

console.log('[*] Inicio')

const summarySched           = daemonLater.parse.text(ltSumaries),
      summaryForTicketSched  = daemonLater.parse.text(ltTicket),
      communicationOfFallForTicketSched = daemonLater.parse.text(ltCommun)

if (summarySched.error !== -1) {
  throw new Error(
    'Error al parsear la expresion de tiempo para la tarea ' +
    'Error in character position: ' + summarySched.error + ', ' +
    'Expresion: "' + ltSumaries + '"'
  )
}

if (summaryForTicketSched.error !== -1) {
  throw new Error(
    'Error al parsear la expresion de tiempo para la tarea.' +
    'Error in character position: ' + summaryForTicketSched.error + ', ' +
    'Expresion: "' + ltTicket + '"'
  )
}

console.log('[*] Registrando tarea 1...')

daemonLater[APP.timerFunction](() => {
  generateDailyTickets()
}, summarySched)

console.log('[*] Registrando tarea 2...')

daemonLater[APP.timerFunction](function() {
  exchangeTicketResumenDiario();
}, summaryForTicketSched);

console.log('[*] Registrando tarea 3...')

daemonLater[APP.timerFunction](function() {
  exchangeTicketComunicacionBaja();
}, communicationOfFallForTicketSched);

/* TAREA 1 */
function generateDailyTickets() {
  console.log('Realizando tarea 1')
}

/* TAREA 2 */
function exchangeTicketResumenDiario() {
  console.log('Realizando tarea 2')
}

/* TAREA 3 */
function exchangeTicketComunicacionBaja() {
  console.log('Realizando tarea 3')
}
