import { useSnackbar } from 'notistack';
import React from 'react';

const { api } = window;

export default function On(): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();

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
