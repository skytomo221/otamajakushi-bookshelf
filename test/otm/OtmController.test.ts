import OtmController from '../../src/main/OtmController';
import { initOtm } from '../../src/otm/Otm';
import path from 'path';

test('OtmController load test', () => {
  new OtmController()
    .load(path.join(__dirname, '..', '..', 'src', 'data', 'sample.json'))
    .then((controller) => {
      expect(controller.readWords().length).toEqual(8);
    });
});
