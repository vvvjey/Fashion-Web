const accessTokenSecret = "abc";
var jwt = require('jsonwebtoken');


async function verifyAccessToken(req,res,next) {
    try {
        let accessTokenRaw = req.headers.authorization;
        accessTokenRaw = accessTokenRaw.split(" ")
        let accessToken = accessTokenRaw[1]
        const decoded = jwt.verify(accessToken, accessTokenSecret);
        // Check if the token is not expired

        // Check against your user database if the user exists
        // const user = await User.findById(decoded.userId);
        // if (!user) {
        //     throw new Error('User not found');
        // }

        // Check if the token is in the revocation list (if applicable)

        // Additional checks based on your application requirements

        next();
    } catch (error) {
        console.log('error',error)
        // Handle token verification errors
        return res.status(401).json({ error: "expried token" });
    }
}
module.exports={
    verifyAccessToken
}