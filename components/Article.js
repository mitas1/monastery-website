import { Layout } from '../components/Layout';
import { Markdown } from '../components/Markdown';
import Preamble from '../components/Preamble';

export default ({ content, preamble, ...other }) => (
    <Layout>
        <Preamble {...preamble} />
        <div className="content-ofset">
            <Markdown {...other} content={content} />
        </div>
        <style jsx>{`
            .content-ofset {
                margin-top: -100px;
            }
            @media screen and (max-width: 992px) {
                .content-ofset {
                    margin-top: -50px;
                }
            }
        `}</style>
    </Layout>
);
