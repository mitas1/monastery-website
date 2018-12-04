import { getTranslations } from "../tools/translationHelpers";
import startI18n from "../tools/startI18n";
import { I18nextProvider } from "react-i18next";
import { withRouter } from "next/router";

import { LANGUAGES } from "../constants";

export const withI18next = () => ComposedComponent =>
    withRouter(
        class extends React.Component {
            static async getInitialProps() {
                const translations = getTranslations(LANGUAGES);

                return {
                    translations
                };
            }
            constructor(props) {
                super(props);

                this.i18n = startI18n(
                    props.translations,
                    props.router.query.lng
                );
            }
            componentWillReceiveProps({ router }) {
                if (this.i18n.language !== router.query.lng) {
                    this.i18n.changeLanguage(router.query.lng);
                }
            }
            render() {
                console.log(this.props);
                return (
                    <I18nextProvider i18n={this.i18n}>
                        <ComposedComponent router={this.props.router} />
                    </I18nextProvider>
                );
            }
        }
    );
