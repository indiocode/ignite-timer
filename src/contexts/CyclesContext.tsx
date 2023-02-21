/* eslint-disable no-unused-vars */
import { differenceInSeconds } from 'date-fns';
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useReducer, useState } from 'react';

import {
	addNewCycleAction,
	interruptCurrentCycleAction,
	markCurrentCycleAsFinishedAction,
} from '~/reducers/cycles/actions';
import type { ICreateCycleData, ICycle } from '~/reducers/cycles/reducer';
import { cyclesReducer } from '~/reducers/cycles/reducer';

interface ICyclesContextType {
	cycles: ICycle[];
	activeCycle: ICycle | undefined;
	activeCycleId: string | null;
	amountSecondsPassed: number;
	markCurrentCycleAsFinished: () => void;
	setAmountSecondsPassed: Dispatch<SetStateAction<number>>;
	createNewCycle: (data: ICreateCycleData) => void;
	interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as ICyclesContextType);

interface ICyclesProviderProps {
	children: ReactNode;
}

export function CyclesContextProvider({
	children,
}: ICyclesProviderProps): ReactElement {
	const [cyclesState, dispatch] = useReducer(
		cyclesReducer,
		{
			cycles: [],
			activeCycleId: null,
		},
		(initialValue) => {
			const storedStateAsJSON = localStorage.getItem(
				'@IGNITE_TIMER:CYCLES_STATE:1.0.0',
			);

			if (!storedStateAsJSON) return initialValue;

			return JSON.parse(storedStateAsJSON);
		},
	);

	const { activeCycleId, cycles } = cyclesState;

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
		if (activeCycle)
			return differenceInSeconds(new Date(), new Date(activeCycle.startDate));

		return 0;
	});

	useEffect(() => {
		const stateJSON = JSON.stringify(cyclesState);
		localStorage.setItem('@IGNITE_TIMER:CYCLES_STATE:1.0.0', stateJSON);
	}, [cyclesState]);

	function markCurrentCycleAsFinished(): void {
		dispatch(markCurrentCycleAsFinishedAction());
	}

	function createNewCycle(data: ICreateCycleData): void {
		const id = String(new Date().getTime());

		const newCycle: ICycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		dispatch(addNewCycleAction(newCycle));

		setAmountSecondsPassed(0);
	}

	function interruptCurrentCycle(): void {
		dispatch(interruptCurrentCycleAction());
	}

	return (
		<CyclesContext.Provider
			value={{
				activeCycle,
				activeCycleId,
				markCurrentCycleAsFinished,
				amountSecondsPassed,
				setAmountSecondsPassed,
				createNewCycle,
				interruptCurrentCycle,
				cycles,
			}}>
			{children}
		</CyclesContext.Provider>
	);
}
