import common from './common.json';
import budget from './budget.json';
import presets from './presets.json';
import privacy from './privacy.json';
import terms from './terms.json';
import bonds from './bonds.json';

const lang = {
  common,
  ...budget,
  presets,
  privacy,
  terms,
  bonds,
};

export default lang;
