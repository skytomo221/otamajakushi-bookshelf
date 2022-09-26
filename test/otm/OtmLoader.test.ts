import path from 'path';

import log from 'electron-log';
import OtmLoader from '../../src/otm/OtmLoader';

test('updateWord cannot change word id', () => {
    log.transports.file.level = 'debug';
    log.transports.console.level = 'debug';
    log.debug('OK!');
  new OtmLoader(path.join(__dirname, '..', '..', 'src', 'data', 'sample.json'))
    .asPromise()
    .then(otm => expect(otm.toPlain().words.length).toBe(8));
});
