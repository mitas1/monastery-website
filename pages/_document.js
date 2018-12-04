import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css?family=Playfair+Display:700i|Martel:200,300|Roboto+Slab:300,300i,400,400i|Roboto:300,300i,400,500,900"
                        rel="stylesheet"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="/static/nprogress.css"
                    />
                    <script src="https://unpkg.com/zooming/build/zooming.min.js" />
                    <style global jsx>
                        {`
                            * {
                                margin: 0;
                                padding: 0;
                            }
                            body {
                                background: #fafafa;
                                font-family: Roboto;
                            }
                        `}
                    </style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
