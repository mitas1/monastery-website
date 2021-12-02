import Document, {
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Martel:wght@600&family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=optional"
                        rel="stylesheet"
                    />
                    <link rel="icon" href="/favicon-48.png" type="image/png" />
                    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                    <link
                        rel="apple-touch-icon"
                        href="/favicon-apple-touch.png"
                    />
                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
