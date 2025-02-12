export const requireField = (val: string) => !!val || 'Field is required';
export const onlyAlphabet = (val: string) =>
  !!val.match(/^[A-Za-z\u0E00-\u0E7F\s]+$/) || 'Only alphabet is allowed';

export const onlyEnglish = (val: string) =>
  !!val.match(/^[A-Za-z\s]+$/) || 'Only English alphabet is allowed';
export const onlyThai = (val: string) =>
  !!val.match(/^[\u0E00-\u0E7F\s]+$/) || 'Only Thai alphabet is allowed';

function validateGradeFormat(val: string) {
  // Regex to match numbers from 1.00 to 4.00 with exactly two decimal places
  const regex = /^[1-4]\.\d{2}$/;
  if (!regex.test(val)) return false; // Check format

  const numericValue = parseFloat(val); // Convert to number
  return numericValue >= 1.0 && numericValue <= 4.0; // Check range
}

export const ruleGradeFormat = (val: string) =>
  validateGradeFormat(val) || 'Invalid grade format';
