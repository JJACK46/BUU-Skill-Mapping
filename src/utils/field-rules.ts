import type { ValidationRule } from 'quasar';

export const requireField: ValidationRule = (val: string) =>
  !!val || 'Field is required';
// export const onlyAlphabet: ValidationRule = (val: string) =>
//   !!val.match(/^[A-Za-z\u0E00-\u0E7F\s]+$/) || 'Only alphabet is allowed';

// export const onlyEnglish: ValidationRule = (val: string) =>
//   !!val.match(/^[A-Za-z\s]+$/) || 'Only English alphabet is allowed';
// export const onlyThai: ValidationRule = (val: string) =>
//   !!val.match(/^[\u0E00-\u0E7F\s]+$/) || 'Only Thai alphabet is allowed';

function validateGradeFormat(val: string) {
  // Regex to match numbers from 1.00 to 4.00 with exactly two decimal places
  const regex = /^[1-4]\.\d{2}$/;
  if (!regex.test(val)) return false; // Check format

  const numericValue = parseFloat(val); // Convert to number
  return numericValue >= 1.0 && numericValue <= 4.0; // Check range
}

function validateCodeFormat(val: string) {
  const regex = /^[0-9]{8}$/;
  return regex.test(val);
}

export const ruleGradeFormat: ValidationRule = (val: string) =>
  validateGradeFormat(val) || 'Invalid grade format (1.00 - 4.00)';
export const ruleCodeFormat: ValidationRule = (val: string) =>
  validateCodeFormat(val) || 'Invalid code format (8 digits)';
