/**
 * External Links & Redirect Helpers
 */
export const EXTERNAL_LINKS = {
  LOGIN: 'https://maanwin10.com/login?type=0',
  REGISTER: 'https://maanwin10.com/register',
  TELEGRAM: 'https://t.me/+u9ciQHkjVaczYTZl',
};

export const redirectToRegister = (inviteCode = '') => {
  if (inviteCode && inviteCode.trim()) {
    window.location.href = `https://maanwin10.com/register?inviteCode=${encodeURIComponent(inviteCode.trim())}&from=web`;
  } else {
    window.location.href = EXTERNAL_LINKS.REGISTER;
  }
};

export const redirectToLogin = () => {
  window.location.href = EXTERNAL_LINKS.LOGIN;
};
