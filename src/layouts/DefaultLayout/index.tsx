import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '~/components/Header';

import * as S from './styles';

export function DefaultLayout(): ReactElement {
	return (
		<S.LayoutContainer>
			<Header />
			<Outlet />
		</S.LayoutContainer>
	);
}
