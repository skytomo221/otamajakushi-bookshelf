import React from "react";
import { useSelector } from "react-redux";

import { Mediator } from "../../Mediator";
import { State } from "../../states/State";

import Recursion from "./Recursion";

const { api } = window;

export default function CardRenderer({
  summary,
  word,
  layout,
}: Mediator): JSX.Element {
  const editable = useSelector<State, boolean>(
    (state: State) =>
      state.bookshelf.books.find(book => book.path === summary.bookPath)
        ?.editable ?? false,
  );
  return (
    <Recursion
      layout={layout}
      summary={summary}
      word={word}
      contents={
        layout.layout.component === 'recursion'
          ? layout.layout.contents
          : [layout.layout]
      }
      editable={editable}
    />
  );
}
