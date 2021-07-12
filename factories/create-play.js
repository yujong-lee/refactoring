const TragedyPlay = require('../models/play/TragedyPlay');
const ComedyPlay = require('../models/play/ComedyPlay');

const plays = {
  tragedy: (audienceCount) => new TragedyPlay(audienceCount),
  comedy: (audienceCount) => new ComedyPlay(audienceCount),
}

const notFound = () => {
  throw new Error('존재하지 않는 연극입니다.');
}

const createPlay = (type, audienceCount) =>
  (plays[type] ?? notFound)(audienceCount);

module.exports = {
  createPlay,
};
