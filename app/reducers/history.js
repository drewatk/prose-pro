const now = new Date().toString();

const defaultHistory = [
  { message: "first commit", date: now },
  { message: "second commit", date: now },
  { message: "day 68. still doesn't work. i'm giving up", date: now }
];

const history = (state = defaultHistory) => state;

export default history;
