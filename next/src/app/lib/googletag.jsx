import Script from 'next/script';

const GoogleTag = () => (
  <>
    {/* Google tag (gtag.js) */}
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W2HSHG1D16" strategy="afterInteractive" />

    <Script id="gtag-script" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-W2HSHG1D16');
      `}
    </Script>
  </>
);

export default GoogleTag;