import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ExtensionProperties } from '../../common/ExtensionProperties';
import { updateExtensionsAction } from '../actions/ExtensionsActions';

const { api } = window;

export default function On(): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const onExtensionsUpdate = useCallback((exts: ExtensionProperties[]) => {
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
