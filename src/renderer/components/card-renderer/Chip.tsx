import { PageCard, LayoutCard, Text, Reference } from 'otamashelf';
import React from 'react';
import { useSelector } from 'react-redux';

import { SummaryWord } from '../../SummaryWord';
import { State } from '../../states/State';
import ThemeParameter from '../../states/ThemeParameter';

// eslint-disable-next-line import/no-cycle
import TextPlain from './Plain';
import styleJoin from './styleJoin';

interface Props {
  baseReference: string;
  className?: string;
  keyword: Text | Reference;
  value: Text | Reference | undefined;
  editable: boolean;
  summary: SummaryWord;
  layout: LayoutCard;
  word: PageCard;
}

export default function Chip({
  baseReference,
  className,
  keyword,
  value,
  editable,
  summary,
  layout,
  word,
}: Props): JSX.Element {
  const theme = useSelector<State, ThemeParameter>(state => state.theme);
  return (
    <span className={styleJoin(theme.style.Chip, className)}>
      <span className={theme.style['Chip.Key']}>
        {keyword.component === 'text' ? (
          <TextPlain text={keyword.text} editable={editable} layout={layout} />
        ) : (
          <TextPlain
            reference={
              keyword.reference.startsWith('.')
                ? baseReference + keyword.reference
                : keyword.reference
            }
            editable={editable}
            summary={summary}
            layout={layout}
            word={word}
          />
        )}
      </span>
      {value && (
        <span className={theme.style['Chip.Value']}>
          {value.component === 'text' ? (
            <TextPlain text={value.text} editable={editable} layout={layout} />
          ) : (
            <TextPlain
              reference={
                value.reference.startsWith('.')
                  ? baseReference + value.reference
                  : value.reference
              }
              editable={editable}
              summary={summary}
              layout={layout}
              word={word}
            />
          )}
        </span>
      )}
    </span>
  );
}
Chip.defaultProps = {
  className: '',
};
