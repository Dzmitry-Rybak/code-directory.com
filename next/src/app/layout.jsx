import './styles/globals.css';
import { Montserrat } from 'next/font/google';
import Header from '@/app/components/header-nav/header-nav.jsx';
import Footer from '@/app/components/footer/footer.jsx';
 
export const metadata = {
    generator: 'Next.js',
    applicationName: 'Code-Directory.com',
    authors: [{ name: 'Dzmitry Rybak', url: 'https://code-directory.com' }],
    creator: 'Dzmitry Rybak',
    publisher: 'Dzmitry Rybak',
    title: {
        template: '%s | Code Directory',
        default: 'Code Directory',
    },
    description: 'Code-directory is a unique free online platform that provides an extensive catalog of questions and answers for popular programming languages. Study, mark, add questions, and create your learning experience.',
    metadataBase: new URL('https://code-directory.com'),
    keywords: ['Python', 'React', 'JavaScript', 'Git', 'programming', 'Interview'],
    referrer: 'origin-when-cross-origin',
    openGraph: {
        title: 'Code-Directory',
        description: 'Code-directory is a unique free online platform that provides an extensive catalog of questions and answers for popular programming languages. Study, mark, add questions, and create your learning experience.',
        url: 'https://code-directory.com',
        siteName: 'Code-Directory.com',
        images: [
          {
            url: 'https://code-directory.com/og.png',
            width: 800,
            height: 600,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
};

import { AppStateProvider } from './context.jsx';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })


export default function RootLayout({ children }) {
  return (
    <AppStateProvider>
        <html lang="en" className={montserrat.variable}>
            <body>
            <Header/>
                <main className='flexGrow'>
                    {children}
                </main>
            <Footer/>  
            </body>
        </html>
    </AppStateProvider>
    )
}
