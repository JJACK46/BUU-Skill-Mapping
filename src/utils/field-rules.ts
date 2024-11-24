export const requireField = (val: string) => !!val || 'Field is required';
export const onlyAlphabet = (val: string) =>
    !!val.match(/^[A-Za-z\u0E00-\u0E7F\s]+$/) || 'Only alphabet is allowed';

export const onlyEnglish = (val: string) => !!val.match(/^[A-Za-z\s]+$/) || 'Only English alphabet is allowed';
export const onlyThai = (val: string) => !!val.match(/^[\u0E00-\u0E7F\s]+$/) || 'Only Thai alphabet is allowed';