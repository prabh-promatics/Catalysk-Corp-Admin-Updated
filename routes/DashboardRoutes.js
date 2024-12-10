import { v4 as uuid } from 'uuid';
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		link: '/'
	},
	{
		id: uuid(),
		title: 'Employee Management',
		icon: 'user',
		link: '/pages/employee-management'
	},
	{
		id: uuid(),
		title: 'Invoices Management',
		icon: 'clipboard',
		link: '/pages/invoices-management'
	},
	{
		id: uuid(),
		title: 'Efficient Employees',
		icon: 'user',
		link: '/pages/efficient-employees'
	},
	// {
	// 	id: uuid(),
	// 	title: 'Sustainability Targets',
	// 	icon: 'crosshair',
	// 	link: '/pages/corporate-sustainability-targets'
	// },
	// {
	// 	id: uuid(),
	// 	title: 'Rewards Management',
	// 	icon: 'award',
	// 	link: '/pages/rewards-management'
	// },
	// {
	// 	id: uuid(),
	// 	title: 'Marketing Collateral',
	// 	icon: 'download',
	// 	link: '/pages/marketing-collateral'
	// },
/* 	{
		id: uuid(),
		title: 'Admin Management',
		icon: 'user-check',
		link: '/pages/admin-management'
	}, */
	// {
	// 	id: uuid(),
	// 	title: 'Catalysk Management',
	// 	icon: 'user',
	// 	link: '/pages/catalysk-management'
	// },



	
	// {
	// 	id: uuid(),
	// 	title: 'LAYOUTS & PAGES',
	// 	grouptitle: true
	// },
	// {
	// 	id: uuid(),
	// 	title: 'Pages',
	// 	icon: 'layers',
	// 	children: [
	// 		{ id: uuid(), link: '/pages/profile', name: 'Profile' },
	// 		{ id: uuid(), link: '/pages/settings', name: 'Settings'},
	// 		{ id: uuid(), link: '/pages/billing', name: 'Billing' },
	// 		{ id: uuid(), link: '/pages/pricing', name: 'Pricing'},
	// 		{ id: uuid(), link: '/not-found', name: '404 Error' }
	// 	]
	// },	
	
	// {
	// 	id: uuid(),
	// 	title: 'Layouts',
	// 	icon: 'layout',
	// 	link: '/layout-vertical'
	// },	
	
	
];

export default DashboardMenu;
