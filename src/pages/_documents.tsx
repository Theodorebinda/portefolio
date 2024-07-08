// pages/_document.tsx
import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';


export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
        <meta name="google" content="notranslate"/>
        <link rel="icon" href='../../public/theodore - Copie.jpg' type="image/theo-icon" />
        <link rel="preload" href="../../public/theodore-removebg-preview.png" as="image" />
        <link
            rel="preload"
            href="../app/globals.css"
            as="style"
            type="font/woff2"
            crossOrigin="anonymous"
          />
            <link 
            rel="app/(main-route)/layout'" 
            href="page.js" 
            as="script">
          </link>
        <style>
                {`
                  .text-6xl {
                    font-size: 4rem;
                    font-weight: normal;
                    font-family: var(--font-inter);
                  }
                `}
        </style>
        <script src="page.tsx" async />
        <script src="../app/(main-route)/page.tsx" async />
        <script src="../app/(main-route)/page.tsx" defer  />
        <script src='../app/(main-route)/layout' async />
        <script src='../app/(main-route)/layout' defer />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
