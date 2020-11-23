'use strict'
const path = require('path');


function resolve(dir) {
    return path.join(__dirname, dir)
}



// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },

    },

}
