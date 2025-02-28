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
							className={({ isActive }) =>
								[
									'px-2 py-1 hover:text-blue-600 hover:underline',

									// You will be adding a Conditional breakpoint on this line.
									// But before you do, there's a slight problem. Conditions can only access
									// variable from the current scope (the `className` function), and our `item`
									// lives in the parent scope.
									//
									// 🐨 Reference the `item` here to be used in the condition for the breakpoint.
									// 💰 item && isActive
									//
									// 🐨 Next, right-click on the gutter to the left of this line and choose
									// the "Add Conditional Breakpoint..." option. Enter `item.title === 'Dashboard'`
									// as the condition for the breakpoint.
									//
									// 🐨 Finally, run the main menu test suite in the debug mode to see what's wrong.
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
