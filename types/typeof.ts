const userName = 'Max';

console.log(typeof userName);

type UserName = typeof userName;

const settings = {
  difficulty: 'easy',
  minLevel: 10,
  didStart: false,
  players: ['John', 'Jane'],
};

// type Settings = typeof settings;

function loadData(s: typeof settings) {
  // ...
}

loadData(settings);
