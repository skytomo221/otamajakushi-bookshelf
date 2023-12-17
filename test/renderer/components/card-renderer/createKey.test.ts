import { LayoutCard } from 'otamashelf/LayoutCard';

import createKey from '../../../../src/renderer/components/card-renderer/createKey';

test('createKey create key from layout card.', () => {
  const layout: LayoutCard = {
    layout: {
      component: 'div',
      contents: [
        { component: 'text', mime: 'text/plain', text: 'a' },
        {
          component: 'div',
          contents: [
            { component: 'text', mime: 'text/plain', text: 'b' },
            { component: 'text', mime: 'text/plain', text: 'c' },
          ],
        },
      ],
    },
  };
  const word = { id: '', title: '' };
  if (layout.layout.component !== 'div') throw new Error('Invalid layout.');
  expect(createKey([layout.layout], 0, word)).toEqual(
    '{"index":0,"component":"div","contents":[{"index":0,"component":"text","mime":"text/plain","text":"a"},{"index":1,"component":"div","contents":[{"index":0,"component":"text","mime":"text/plain","text":"b"},{"index":1,"component":"text","mime":"text/plain","text":"c"}]}]}',
  );
  if (layout.layout.contents[1].component !== 'div')
    throw new Error('Invalid layout.');
  expect(createKey(layout.layout.contents, 1, word)).toEqual(
    '{"index":1,"component":"div","contents":[{"index":0,"component":"text","mime":"text/plain","text":"b"},{"index":1,"component":"text","mime":"text/plain","text":"c"}]}',
  );
});
