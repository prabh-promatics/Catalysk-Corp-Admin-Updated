// import theme style scss file
import Link from 'next/link';
import 'styles/theme.scss';
import 'rsuite/dist/rsuite.min.css';


import 'bootstrap/dist/css/bootstrap.min.css'; 
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'

if (typeof window !== "undefined") {
    // Dynamically import Bootstrap JS on the client side
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }

export const metadata = {
    title: 'Catalysk Corporate Admin',
    description: 'Dash UI - Next JS admin dashboard template is free and available on GitHub. Create your stunning web apps with our Free Next js template. An open-source admin dashboard built using the new router, server components, and everything new in Next.js 13.',
    keywords: 'Dash UI, Next.js 13, Admin dashboard, admin template, web apps, bootstrap 5, admin theme'
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='bg-light'>
                {children}

               
            </body>
        </html>
    )
}
