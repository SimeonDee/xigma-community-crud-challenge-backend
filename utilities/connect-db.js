const mongoose = require('mongoose')

module.exports.db = {
    connect: () => {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        db = mongoose.connection
        db.once('open', () => { console.log(`Connection to MongoDB established...`) })
        db.on('error', (err) => { console.log(`Database Connection Error: \n${err.message}`) })
    }
}

