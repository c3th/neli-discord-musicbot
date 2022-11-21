/*

                     /$$ /$$
                    | $$|__/
 /$$$$$$$   /$$$$$$ | $$ /$$
| $$__  $$ /$$__  $$| $$| $$
| $$  \ $$| $$$$$$$$| $$| $$
| $$  | $$| $$_____/| $$| $$
| $$  | $$|  $$$$$$$| $$| $$
|__/  |__/ \_______/|__/|__/

Developed by matt

*/

const Neli = require('./lib/Client');

const { prefix, token, dev } = require('./bwd/json/config.json');
const database = require('./bwd/json/database.json');

const client = new Neli({
  hideDir: [
    'Developer Commands'
  ],
  locales: [
    'en-US'
  ],
  commandPrefix: prefix,
  constants: require('./bwd/json/constants.json'),
  utils: require('./lib/utils'),
  dev,
});

client.registry
  .registerMongoDatabase(database)
  .registerDefaultPath(__dirname)
  .registerInhibitors([
    ['General', 'General Inhibitors'],
    ['Music', 'Music Inhibitors'],
  ])
  .registerCommandGroups([
    // ['Admin', 'Admin Commands'],
    ['Developer', 'Developer Commands'],
    ['General', 'General Commands'],
    // ['Casino', 'Casino Commands'],
    ['Music', 'Music Commands']
  ]);

client.login(token);