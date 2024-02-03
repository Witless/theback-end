 const userControllers = {
    login: (req, res) => {
        res.send("Logged in!")
    },
    signup: (req, res) => {
        res.send("Signed up!")
    }
}

export default userControllers;