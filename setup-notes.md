Terminal Commands:

npm init -y  > initialize npm with default options (creates package.json)
npm install typescript   > converts project into a TypeScript project
tsc --init  > creates base tsconfig.json (configure the tsconfig.json to match recommended configurations)
npm install webpack webpack-cli ts-loader typescript -D  > webpack default setup
npm install npm-run-all  > so you don't have to kill and turn on server to see updates, can just refresh
npm install webpack-dev-server
npm install uuid  > installing uuid for unique key generation
npm install @types/uuid  > installing uuid as type for TypeScript

Updates To Make:

tsconfig.json
=> target = ESNext
=> module = ESNext
=> noImplicitAny > uncomment/turn on
=> noUnusedParameters > uncomment/turn on
=> noUncheckedIndexedAccess > uncomment/turn on

package.json
=> scripts
    -> add: "start": "npm-run-all --parallel build serve",
    -> add: "serve": "webpack-dev-server",
    -> add: "build": "webpack --watch"


make webpack.config.js file
content:
const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        publicPath: 'public',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }
}

make src folder
=> index.ts

make public folder
=> static folder
    -> main.css (if want to add css)
=> bundle.js (made by running npm run build [in terminal] AFTER you have added them to script)
=> index.html (make sure to script it to bundle.js and link it to main.css)


IF tsconfig.json HAS AN ERROR ON LINE 1 AT CURLY BRACE, TRY CTRL+SHIFT+P AND RELOAD WINDOW