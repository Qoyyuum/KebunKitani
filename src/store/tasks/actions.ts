/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { TaskStateInterface } from './state';
import {
  createLog, mergeLogFromServer, setLastSync, setLogTypes,
} from '../../utils/farmLog';
import defaultResources from '../defaultResources';
import { checkHost, getRemoteLogs, sendRemoteLogs } from '../http';
import createQuery from '../../utils/createQuery';
import farm from '../farmClient';
import upsert from '../../utils/upsert';

const makeEntityAdder = (name: string | number, identifier: any) => (state: { [x: string]: any; }, payload: any[]) => {
  if (Array.isArray(payload)) {
    payload.forEach(ent => upsert(state[name], identifier, ent));
  } else {
    upsert(state[name], identifier, payload);
  }
};

const actions: ActionTree<TaskStateInterface, StateInterface> = {
  initializeLog (/* context */) {
    console.log('Action Taken')
  }
};

export default actions;
