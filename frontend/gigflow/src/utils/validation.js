export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

export const checkPasswordStrength = (pass) => {
  let score = 0;
  if (pass.length > 7) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;
  return score;
};

export const getPasswordChecks = (password) => [
  { label: "8+ chars", met: password.length > 7 },
  { label: "Number", met: /[0-9]/.test(password) },
  { label: "Symbol", met: /[^A-Za-z0-9]/.test(password) },
  { label: "Uppercase", met: /[A-Z]/.test(password) },
];

