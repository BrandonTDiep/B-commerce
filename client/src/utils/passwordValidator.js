import validator from 'validator';

export const validatePassword = (password) => {
  const errors = [];

  if (!validator.isLength(password, { min: 8 })) {
    errors.push('Must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Must contain at least one number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Must contain at least one special character (!@#$%^&*)');
  }

  return errors;
};
