import { useSnackbar } from 'notistack';
import { ExtensionProperties } from 'otamashelf';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

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
