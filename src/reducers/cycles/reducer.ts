/* eslint-disable no-unused-vars */
import { produce } from 'immer';

import type { Action } from './actions';
import { ActionTypes } from './actions';

export interface ICreateCycleData {
	task: string;
	minutesAmount: number;
}

export interface ICycle extends ICreateCycleData {
	id: string;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

interface ICycleState {
	cycles: ICycle[];
	activeCycleId: string | null;
}

export function cyclesReducer(state: ICycleState, action: Action): ICycleState {
	switch (action.type) {
		case ActionTypes.ADD_NEW_CYCLE:
			return produce(state, (draft) => {
				draft.cycles.push(action.payload?.newCycle as ICycle);
				draft.activeCycleId = action.payload?.newCycle.id as string;
			});
		case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
			const currentCycleIndex = state.cycles.findIndex((cycle) => {
				return cycle.id === state.activeCycleId;
			});

			if (currentCycleIndex < 0) {
				return state;
			}

			return produce(state, (draft) => {
				draft.activeCycleId = null;
				draft.cycles[currentCycleIndex].interruptedDate = new Date();
			});
		}
		case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
			const currentCycleIndex = state.cycles.findIndex((cycle) => {
				return cycle.id === state.activeCycleId;
			});

			if (currentCycleIndex < 0) {
				return state;
			}

			return produce(state, (draft) => {
				draft.activeCycleId = null;
				draft.cycles[currentCycleIndex].finishedDate = new Date();
			});
		}
		default:
			return state;
	}
}
