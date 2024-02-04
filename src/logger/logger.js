/**
 * Static methods for providing logs
 */
export default class Logger {

    static apolloInfoLog(message){
        console.info(`[${new Date()}] [Apollo] [Info]: ${message}`)
    }


}