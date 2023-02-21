import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from 'phosphor-react';
import type { ReactElement } from 'react';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';

import { CyclesContext } from '~/contexts/CyclesContext';

import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import * as S from './styles';

const newCycleFormValitationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(1, 'O ciclo precisa ser de no minímo 5 minutos')
		.max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type INewCycleFormData = zod.infer<typeof newCycleFormValitationSchema>;

export function Home(): ReactElement {
	const { createNewCycle, interruptCurrentCycle, activeCycle } =
		useContext(CyclesContext);
	const newCycleForm = useForm<INewCycleFormData>({
		resolver: zodResolver(newCycleFormValitationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		},
	});

	const { handleSubmit, watch, reset } = newCycleForm;

	const task = watch('task');
	const isSubmiteDisabled = !task;

	function handleCreateNewCycle(data: INewCycleFormData): void {
		createNewCycle(data);
		reset();
	}

	return (
		<S.HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>

				<Countdown />

				{activeCycle ? (
					<S.StopCountdownButton type="button" onClick={interruptCurrentCycle}>
						<HandPalm size={24} />
						Interromper
					</S.StopCountdownButton>
				) : (
					<S.StartCountdownButton type="submit" disabled={isSubmiteDisabled}>
						<Play size={24} />
						Começar
					</S.StartCountdownButton>
				)}
			</form>
		</S.HomeContainer>
	);
}
