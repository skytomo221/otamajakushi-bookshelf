import { initOtm, OtmController } from '../../src/otm/index';

test('initOtm to equal initOtm', () => {
  expect(new OtmController().load(JSON.stringify(initOtm)).otm).toEqual(
    initOtm,
  );
});

test('42 to equal error', () => {
  expect(() => new OtmController().load(JSON.stringify(42)).otm).toThrowError();
});

test('addWord', () => {
  expect(
    new OtmController().addWord({
      entry: {
        form: 'word',
      },
    }).otm.words,
  ).toStrictEqual([
    {
      entry: {
        id: 1,
        form: 'word',
      },
      translations: [],
      tags: [],
      contents: [],
      variations: [],
      relations: [],
    },
  ]);
});

test('renumber', () => {
  expect(
    new OtmController()
      .addWord({
        entry: {
          id: 2,
          form: 'hello',
        },
      })
      .addWord({
        entry: {
          id: 4,
          form: 'world',
        },
      })
      .renumber().otm.words,
  ).toStrictEqual([
    {
      entry: {
        id: 1,
        form: 'hello',
      },
      translations: [],
      tags: [],
      contents: [],
      variations: [],
      relations: [],
    },
    {
      entry: {
        id: 2,
        form: 'world',
      },
      translations: [],
      tags: [],
      contents: [],
      variations: [],
      relations: [],
    },
  ]);
});

test('updateWord', () => {
  expect(
    new OtmController()
      .addWord({
        entry: {
          form: 'word',
        },
      })
      .updateWord({
        filter: word => word.entry.form === 'word',
        map: word => ({
          ...word,
          entry: { id: 1 },
          contents: [
            ...word.contents,
            {
              title: 'lorem ipsum',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
          ],
        }),
      }).otm.words,
  ).toStrictEqual([
    {
      entry: {
        id: 1,
        form: 'word',
      },
      translations: [],
      tags: [],
      contents: [
        {
          title: 'lorem ipsum',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      ],
      variations: [],
      relations: [],
    },
  ]);
});

test('updateWord cannot change word id', () => {
  expect(
    new OtmController()
      .addWord({
        entry: {
          form: 'word',
        },
      })
      .updateWord({
        filter: word => word.entry.id === 1,
        map: word => ({
          ...word,
          entry: { id: 2 },
        }),
      }).otm.words[0].entry,
  ).toStrictEqual({
    id: 1,
    form: 'word',
  });
});
