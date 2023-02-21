/* eslint-disable no-unused-vars */
import type { ICycle } from './reducer';

export enum ActionTypes {
	ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
	INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
	MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export interface Action {
	type: ActionTypes;
	payload?: {
		newCycle: ICycle;
	};
}

export function addNewCycleAction(newCycle: ICycle): Action {
	return {
		type: ActionTypes.ADD_NEW_CYCLE,
		payload: {
			newCycle,
		},
	};
}

export function markCurrentCycleAsFinishedAction(): Action {
	return {
		type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
	};
}

export function interruptCurrentCycleAction(): Action {
	return {
		type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
	};
}
