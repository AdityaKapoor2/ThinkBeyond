const fs = require('fs');
const stateCode = fs.readFileSync('state.js', 'utf8');
global.window = {};
global.localStorage = { getItem: () => null, setItem: () => {} };
eval(stateCode);
console.log('tradgames path ID:', window.PlayerState.state.paths.find(p => p.id === 'tradgames')?.id);
console.log('tradgames events length:', window.PlayerState.getTradGamesEvents()?.length);
