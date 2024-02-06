import './styles/globals.css';
import { Montserrat } from 'next/font/google';
import Header from '@/app/components/header-nav/header-nav.jsx';
import Footer from '@/app/components/footer/footer.jsx';
import GoogleTag from './lib/googletag';
 
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
    description: 'Code-directory is a unique free online platform that provides an extensive catalog of questions and answers for popular programming languages. Study, mark, add questions, and create your learning experience. Check out the top programming & coding questions with answers you can expect in 2024.',
    metadataBase: new URL('https://code-directory.com'),
    alternates: {
      languages: {
        'en': 'https://code-directory.com/?stack=javascript&language=russian=english',
        'ru': 'https://code-directory.com/?stack=javascript&language=russian',
        'pl': 'https://code-directory.com/?stack=javascript&language=russian=polish'
      },
    },
    keywords: ['coding interview questions', 'coding interview questions and answers', 'coding interview',  'programming interview questions', 'React questions', 'JavaScript questions', 'Git questions', 'Вопросы на собеседовании по программированию', 'pytania na rozmowie programista'],
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
    manifest: 'https://code-directory.com/manifest.json',
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
      other: {
        me: ['CodeDirectoryApp@gmail.com'],
      },
    },
};

import { AppStateProvider } from './context.jsx';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })


export default function RootLayout({ children }) {
  return (
    <AppStateProvider>
        <html lang="en" className={montserrat.variable}>
            <GoogleTag/>
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
