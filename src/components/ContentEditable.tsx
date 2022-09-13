/* eslint-disable react/no-danger */
import React, {useRef} from 'react';

interface Props {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

const ContentEditable = ({value, onChange}: Props): JSX.Element => {
  const defalutValue = useRef(value);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.innerHTML)
  }

  return (
    <div
      contentEditable
      onInput={handleInput}
      dangerouslySetInnerHTML={{ __html: defalutValue.current}}
    />
  );
};

export default ContentEditable
