import React, { useEffect, useState } from 'react';

const { api } = window;

interface Props {
  mime: string;
  text: string;
}

export default function Mime({ text, mime }: Props): JSX.Element {
  const [innerHtml, setInnerHtml] = useState('');
  useEffect(() => {
    const convertText = async () => {
      const { html } = await api.convertMime(mime, text);
      setInnerHtml(html);
    };
    convertText();
  }, []);
  if (text)
    return (
      <p
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: innerHtml }}
      />
    );
  api.log.error('reference and text is undifined.');
  return <></>;
}
