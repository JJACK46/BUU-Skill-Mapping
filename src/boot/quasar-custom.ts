import { Notify } from 'quasar';

Notify.registerType('ok', {
    progress: true,
    position: 'bottom',
    color: 'positive',
    textColor: 'white',
    icon: 'done',
    timeout: 2000
})