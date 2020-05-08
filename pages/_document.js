import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        const {
            res: { locals: { language } },
          } = ctx;

        return { ...initialProps, language };
    }

    render() {
        return (
            <Html lang={this.props.language}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;
