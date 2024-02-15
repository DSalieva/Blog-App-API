require('colors')
require('dotenv').config({path:'./config/.env'});
const express = require('express')
const app = express();

// Configuration
const PORT = proess.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';
const MODE = process.env.MODE || 'production'
    require('express-async-errors')

 // Connect DB
 require('./configure/db')();
 
 // Middlewares 
 // Parse JSON
 app.use(express.json)()
 // LOgger 
 app.use(require('./middlewares/logger'))
 // File upload 
 app.use(fileupload())
 // Set static folder
 app.use(express.static(path.join(_dirname, 'public')))

 // Routes
 app.use('/api', require('./routes'))

 // Error Handler 
 app.use(require('./middlewares/errorHandler'));

// Run Server 
const server = app.listen(
    PORT, console.log(
        `Server running in ${MODE} mode on http://${HOST}:${PORT}`.blue.underline,

    
),
);

// Handle rejections
process.on('unhandledRejection', (error, promise)=> {
    console.log(`Error: ${error.message}`.red)
    server.close(()=>{
        console.log(`Server Stopped!`.red.underline)
        process.exit(1)
    })
})