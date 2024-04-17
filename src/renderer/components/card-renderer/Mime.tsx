import { TextConverterProperties } from 'otamashelf/TextConverter';
import React, { useEffect, useState } from 'react';

import { useExtensionsStore } from '../../contexts/extensionsContext';

const { api } = window;

interface Props {
  mime: string;
  text: string;
}

export default function Mime({ text, mime }: Props): JSX.Element {
  const extensions = useExtensionsStore();
  const converterPropertiesList = extensions
    .filter(
      (ext): ext is TextConverterProperties => ext.type === 'text-converter',
    )
    .filter(ext => ext.mime === mime);
  if (converterPropertiesList.length === 0) {
    api.log.error('Text conver is not found.');
    return <></>;
  }
  const [innerHtml, setInnerHtml] = useState('');
  useEffect(() => {
    const convertText = async () => {
      const { html } = await api.convertTextConverter(
        converterPropertiesList.find(c => c.mime === mime)?.id ?? '',
        {
          configuration: {
            specialPage: 'configuration',
            pageFormat: '',
            data: {},
          },
          text,
        },
      );
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
