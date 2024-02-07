import { useSnackbar } from 'notistack';
import { ExtensionProperties } from 'otamashelf';
import React from 'react';

import { useExtensionsDispatch } from '../contexts/extensionsContext';

const { api } = window;

export default function On(): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useExtensionsDispatch();
  function onExtensionsUpdate(exts: ExtensionProperties[]) {
    dispatch({ type: 'UPDATE_EXTENSIONS', payload: exts });
  }

  api.onExtensions('extensions:send', (_, exts) => {
    api.log.info('extensions:send', exts);
    onExtensionsUpdate(exts);
  });

  api.onDefaultLog('log:default', (_, log) => {
    api.log.error('[main]', log);
    enqueueSnackbar(log, { variant: 'default' });
  });

  api.onErrorLog('log:error', (_, log) => {
    api.log.error('[main]', log);
    enqueueSnackbar(log, { variant: 'error' });
  });

  api.onInfoLog('log:info', (_, log) => {
    api.log.error('[main]', log);
    enqueueSnackbar(log, { variant: 'info' });
  });

  api.onSuccessLog('log:success', (_, log) => {
    api.log.error('[main]', log);
    enqueueSnackbar(log, { variant: 'success' });
  });

  api.onWarningLog('log:warning', (_, log) => {
    api.log.error('[main]', log);
    enqueueSnackbar(log, { variant: 'warning' });
  });

  return <></>;
}
