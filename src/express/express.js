import user from "./routes/user.js"

export default class ExpressServer {

    constructor(app) {this.app = app}
    init(){

        this.app.use("/user", user)



    }




}