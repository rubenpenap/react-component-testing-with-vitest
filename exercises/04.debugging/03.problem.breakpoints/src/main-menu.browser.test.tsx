import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { MemoryRouter } from 'react-router'
import { MainMenu } from './main-menu'

test('renders the currently active menu link', async () => {
	// 🐨 Render the <MainMenu /> component.
	// Use a custom `wrapper` and `<MemoryRouter />` from "react-router"
	// so the rendered component can access routing-related data.
	//
	// 🐨 Create a variable called `allLinks` and assign it the result
	// of locating all elements with the role "link".
	// 💰 page.getByRole(role).elements()
	//
	// 🐨 Create another variable called `currentPageLink`.
	// For its value, try to find a link element from `allLinks`
	// whose "aria-current" attribute equals to "page".
	// 💰 element.getAttribute(attributeName)
	//
	// 🐨 Finally, write an assertion that the `currentPageLink`
	// has acessible name that equals to "Analytics".
	// await expect.element(locator).toHaveAccessibleName(name)
	//
	// Once you run this test, you will notice it's failing.
	// 🐨 See what's wrong by adding a conditional breakpoint
	// somewhere during the <MenuItemsList /> rendering.
	// For the condition, use the title of the wrong active link.
})
