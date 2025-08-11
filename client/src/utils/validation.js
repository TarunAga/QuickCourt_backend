/**
 * Password strength validation utility
 * Provides client-side validation and strength indication
 */

export const passwordStrength = {
  // Check password strength
  checkStrength: (password) => {
    let score = 0;
    const feedback = [];

    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('Password must be at least 8 characters long');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Add lowercase letters');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Add uppercase letters');
    }

    // Number check
    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('Add numbers');
    }

    // Special character check
    if (/[@$!%*?&]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Add special characters (@$!%*?&)');
    }

    // Length bonus
    if (password.length >= 12) {
      score += 1;
    }

    // Determine strength level
    let strength;
    let color;
    if (score <= 2) {
      strength = 'Weak';
      color = '#ff4444';
    } else if (score <= 4) {
      strength = 'Medium';
      color = '#ffaa00';
    } else if (score <= 5) {
      strength = 'Strong';
      color = '#00aa00';
    } else {
      strength = 'Very Strong';
      color = '#00ff00';
    }

    return {
      score,
      strength,
      color,
      feedback,
      isValid: score >= 4 // Require at least medium strength
    };
  },

  // Validate password format (matches backend validation)
  isValidFormat: (password) => {
    const minLength = password.length >= 8;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);

    return {
      isValid: minLength && hasLower && hasUpper && hasNumber && hasSpecial,
      errors: {
        minLength: !minLength ? 'Password must be at least 8 characters' : null,
        hasLower: !hasLower ? 'Must contain lowercase letter' : null,
        hasUpper: !hasUpper ? 'Must contain uppercase letter' : null,
        hasNumber: !hasNumber ? 'Must contain number' : null,
        hasSpecial: !hasSpecial ? 'Must contain special character (@$!%*?&)' : null,
      }
    };
  }
};

// Email validation utility
export const emailValidator = {
  isValid: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  normalize: (email) => {
    return email.toLowerCase().trim();
  }
};

// Input sanitization utilities
export const inputSanitizer = {
  // Remove potentially dangerous characters
  sanitizeText: (text) => {
    return text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=\s*["\'][^"\']*["\']/gi, '') // Remove event handlers
      .trim();
  },

  // Sanitize name input
  sanitizeName: (name) => {
    return name
      .replace(/[^a-zA-Z\s'-]/g, '') // Only allow letters, spaces, hyphens, and apostrophes
      .trim();
  },

  // Sanitize phone number
  sanitizePhone: (phone) => {
    return phone.replace(/[^\d+()-\s]/g, '').trim();
  }
};
