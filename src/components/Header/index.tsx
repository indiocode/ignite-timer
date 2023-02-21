import { Scroll, Timer } from 'phosphor-react';
import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { IgniteLogo } from '~/assets';

import * as S from './styles';

export function Header(): ReactElement {
	return (
		<S.HeaderContainer>
			<img src={IgniteLogo} alt="" />
			<nav>
				<NavLink to="/" title="Timer">
					<Timer size={24} />
				</NavLink>
				<NavLink to="/history" title="Histórico">
					<Scroll size={24} />
				</NavLink>
			</nav>
		</S.HeaderContainer>
	);
}
