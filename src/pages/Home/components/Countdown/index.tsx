import { differenceInSeconds } from 'date-fns';
import { useContext } from 'react';
import { useEffect } from 'react';
import { CyclesContext } from '~/contexts/CyclesContext';
import * as S from './styles';

export function Countdown() {
	const {
		activeCycle,
		markCurrentCycleAsFinished,
		amountSecondsPassed,
		setAmountSecondsPassed,
	} = useContext(CyclesContext);

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondsAmouunt = currentSeconds % 60;
	const minutes = String(minutesAmount).padStart(2, '0');
	const seconds = String(secondsAmouunt).padStart(2, '0');

	useEffect(() => {
		let interval: number | ReturnType<typeof setInterval>;

		if (activeCycle) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(
					new Date(),
					new Date(activeCycle.startDate),
				);

				if (secondsDifference >= totalSeconds) {
					markCurrentCycleAsFinished();

					setAmountSecondsPassed(totalSeconds);
					clearInterval(interval);
				} else setAmountSecondsPassed(secondsDifference);
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [
		activeCycle,
		markCurrentCycleAsFinished,
		setAmountSecondsPassed,
		totalSeconds,
	]);

	useEffect(() => {
		if (activeCycle) {
			document.title = `Ignite Timer ${minutes}:${seconds}`;
		}
	}, [minutes, seconds, activeCycle]);

	return (
		<S.CountdownContainer>
			<span>{minutes[0]}</span>
			<span>{minutes[1]}</span>
			<S.Separator>:</S.Separator>
			<span>{seconds[0]}</span>
			<span>{seconds[1]}</span>
		</S.CountdownContainer>
	);
}
