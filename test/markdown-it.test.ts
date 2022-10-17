import MarkdownIt from 'markdown-it';

test('42 to equal <p>42</p>\n', () => {
  const md = new MarkdownIt();
  const result = md.render('42');
  expect(result).toEqual('<p>42</p>\n');
});
