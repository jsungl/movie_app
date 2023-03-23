require("dotenv").config();
if(process.env.NODE_ENV === 'production') {
    module.exports = { dbURI : process.env.MONGODB_PROD_URI }
}else {
    module.exports = { dbURI : process.env.MONGODB_DEV_URI }
}