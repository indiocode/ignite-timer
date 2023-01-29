import * as S from './styles';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '~/contexts/CyclesContext';

export function NewCycleForm() {
	const { activeCycle, cycles } = useContext(CyclesContext);
	const { register } = useFormContext();
	const dataList = [...new Set(cycles)];

	return (
		<S.FormContainer>
			<label htmlFor="task">Vou trabalhar em</label>
			<S.TaskInput
				type="text"
				id="task"
				placeholder="Dê um nome para o seu projeto"
				list="task-sugestion"
				disabled={!!activeCycle}
				autoComplete="off"
				{...register('task')}
			/>

			<datalist id="task-sugestion">
				{dataList.length > 0 &&
					dataList.map((data) => (
						<option value={data.task} key={data.id}>
							{data.task}
						</option>
					))}
				{/* <option value="Projeto 1" />
				<option value="Projeto 2" /> */}
			</datalist>

			<label htmlFor="minutesAmount">durante</label>
			<S.MinutesAmountInput
				type="number"
				id="minutesAmount"
				placeholder="00"
				step={5}
				min={1}
				max={60}
				disabled={!!activeCycle}
				{...register('minutesAmount', {
					valueAsNumber: true,
				})}
			/>
			<span>minutos.</span>
		</S.FormContainer>
	);
}
