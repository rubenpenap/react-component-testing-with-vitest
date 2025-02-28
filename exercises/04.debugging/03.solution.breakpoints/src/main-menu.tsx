import { NavLink } from 'react-router'

interface MenuItem {
	title: string
	url: string
	children?: Array<MenuItem>
}

const menuItems: Array<MenuItem> = [
	{
		title: 'Docs',
		url: '/docs',
	},
	{
		title: 'Dashboard',
		url: '/dashboard',
		children: [
			{
				title: 'Profile',
				url: '/dashboard/profile',
			},
			{
				title: 'Analytics',
				url: '/dashboard/analytics',
			},
			{
				title: 'Settings',
				url: '/dashboard/settings',
			},
		],
	},
] as const

function MenuItemsList({ items }: { items: Array<MenuItem> }) {
	return (
		<ul className="ml-4">
			{items.map((item) => {
				return (
					<li key={item.url}>
						<NavLink
							to={item.url}
							end={true}
							className={({ isActive }) =>
								[
									'px-2 py-1 hover:text-blue-600 hover:underline',
									isActive ? 'font-bold text-black' : 'text-gray-600',
								].join(' ')
							}
						>
							{item.title}
						</NavLink>
						{item.children ? <MenuItemsList items={item.children} /> : null}
					</li>
				)
			})}
		</ul>
	)
}

export function MainMenu() {
	return <MenuItemsList items={menuItems} />
}
