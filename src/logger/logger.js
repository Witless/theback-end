/**
 * Static methods for providing logs
 */
export default class Logger {

    static apolloInfoLog(type, context){
        console.info(`[${new Date()}] [Apollo] [Info]: ${type} | ${context}`)
    }


}