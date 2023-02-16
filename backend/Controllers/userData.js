const { User } = require('../Models/users');
const bcrypt = require('bcrypt');

module.exports = {
    // default route
    homeRoute: async (req, res) => {
        res.send('Hello from server!!...');
    },
    // this method is called when we navigate to "/register" in browser
    registerRoute: async (req, res) => {

        try {
            const password = await bcrypt.hash(req.body.password, 10);
            const user = await User({ ...req.body, password });
            user.save((error, result) => {
                if (error) {
                    if (error.message.toLowerCase().includes('required')) {
                        res.sendStatus(400);
                        return;
                    }
                    res.sendStatus(409);
                    return;
                }
                res.send({ email: result.email, username: result.username });
            });

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },


    // this method is called when we navigate to "/login" in browser
    loginRoute: async (req, res) => {

        try {
            if (!!!req.body.username || !!!req.body.password) {
                res.sendStatus(400);
                return;
            }

            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.sendStatus(404);
                return;
            }
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                res.sendStatus(404);
                return;
            }
            res.send({ email: user.email, username: user.username });

        } catch (err) {
            res.sendStatus(500);
        }
    }

}
