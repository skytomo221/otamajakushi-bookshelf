import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ExtensionInfo } from '../../common/ExtensionInfo';
import { addBookAction } from '../actions/BookshelfActions';
import { updateExtensionsAction } from '../actions/ExtensionsActions';
import { State } from '../states/State';

const { api } = window;

export default function On(): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const extensions = useSelector<State, ExtensionInfo[]>(
    (state: State) => state.extensions,
  );
  const dispatch = useDispatch();
  const onExtensionsUpdate = useCallback((exts: ExtensionInfo[]) => {
    dispatch(updateExtensionsAction(exts));
  }, []);

  api.onExtensions('extensions:send', (_, exts) => {
    api.log.info('extensions:send', exts);
    onExtensionsUpdate(exts);
  });

  api.onErrorLog('log:error', (_, log) => {
    api.log.error('[main]', log);
    enqueueSnackbar(log);
  });

  return <></>;
}
