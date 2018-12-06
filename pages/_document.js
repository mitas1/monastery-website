import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css?family=Martel:600,700,900|Roboto:300,300i,400,400i,500,700"
                        rel="stylesheet"
                    />
                    <meta
                        name="viewport"
                        content="width=1200"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
