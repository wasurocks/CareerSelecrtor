// Export URI for connection to database
module.exports = {
    mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-vjl21.mongodb.net/test?retryWrites=true&w=majority`
};