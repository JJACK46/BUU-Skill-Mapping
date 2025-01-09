<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';
import { ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

const token = ref();
const { t } = useI18n();

const handleToken = () => {
  const urlParams = new URLSearchParams(window.location.search);
  token.value = urlParams.get('token');
  if (token.value) {
    localStorage.setItem('token', token.value ?? '');
    window.location.replace('/');
  }
};

watchEffect(() => {
  handleToken();
});

defineOptions({
  name: 'Skill-Mapping',
});

useMeta({
  // sets document title
  title: '',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${t(title)} - Skill Mapping`,

  // meta tags
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'BUU', content: 'BUU Skill Mapping website' },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - Skill Mapping`;
      },
    },
  },

  // CSS tags
  link: {
    material: {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    },
  },

  // JS tags
  // script: {
  //   ldJson: {
  //     type: 'application/ld+json',
  //     innerHTML: '{ "@context": "http://schema.org" }',
  //   },
  // },

  // <html> attributes
  // htmlAttr: {
  //   'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">,
  //   empty: undefined, // generates <html empty>
  // },

  // <body> attributes
  // bodyAttr: {
  //   'action-scope': 'xyz', // generates <body action-scope="xyz">
  //   empty: undefined, // generates <body empty>
  // },

  // <noscript> tags
  noscript: {
    default: 'This is content for browsers with no JS (or disabled JS)',
  },
});
</script>
