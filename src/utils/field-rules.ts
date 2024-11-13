export const requireField = (val: string) => !!val || 'Field is required';
export const onlyAlphabet = (val: string) => !!val.match(/^[A-Za-z\s]+$/) || 'Only alphabet is allowed';
