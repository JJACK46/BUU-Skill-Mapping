import { createI18n } from 'vue-i18n'
import { App } from 'vue';

import th from '../locales/th.json'
import en from '../locales/en.json'

const messages = {
    'th-TH': th,
    'en-US': en
}


export default ({ app }: { app: App }) => {
    const i18n = createI18n({
        locale: 'th-TH',
        legacy: false, // comment this out if not using Composition API
        messages
    });

    app.use(i18n);
}

