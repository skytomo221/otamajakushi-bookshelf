import { initOtm, Otm } from '../../src/otm/Otm';

test('initOtm to equal initOtm', () => {
  expect(new Otm().fromString(JSON.stringify(initOtm)).toPlain()).toEqual(
    initOtm,
  );
});

test('42 to equal error', () => {
  expect(() =>
    new Otm().fromString(JSON.stringify(42)).toPlain(),
  ).toThrowError();
});

test('addWord', () => {
  expect(
    new Otm()
      .addWord({
        entry: {
          form: 'word',
        },
      })
      .toPlain().words,
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
    new Otm()
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
      .renumber()
      .toPlain().words,
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
    new Otm()
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
      })
      .toPlain().words,
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
    new Otm()
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
      })
      .toPlain().words[0].entry,
  ).toStrictEqual({
    id: 1,
    form: 'word',
  });
});
