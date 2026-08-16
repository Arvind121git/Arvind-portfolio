export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validateContactForm({ name, email, message }) {
  const errors = {};
  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!email || !validateEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!message || message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters long.";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
