import React, {
    Component
} from 'react'
import Link from 'next/link'
import {
    I18nextProvider
} from 'react-i18next'

import startI18n from '../tools/startI18n'
import {
    getTranslation
} from '../tools/translationHelpers'

export default class Homepage extends Component {
    static async getInitialProps({
        query: {
            lng
        }
    }) {
        const translations = await getTranslation(
            lng, ['sk', 'en']
        )

        return {
            lng,
            translations
        }
    }

    constructor(props) {
        super(props)

        this.i18n = startI18n(props.translations, props.lng)
    }

    render(props) {

        return (
            <I18nextProvider i18n={this.i18n}>
                <div className='content'>
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800"
                        rel="stylesheet" />
                    <style global jsx>{`
                        * {
                            margin: 0;
                            padding: 0;
                        }
                        body {
                            background: #fafafa;
                            font-family: Roboto;
                        }
                    `}</style>
                    <style jsx>{`
                        .content {
                            width: 1000px;
                            margin: 0 auto;
                            background-color: #fff;
                        }
                    `}</style>
                </div>
          </I18nextProvider>
        )
    }
}
