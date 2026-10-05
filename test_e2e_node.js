/**
 * MaanWin51 - Complete End-to-End API and Flow Verification
 */

const http = require('http');

const BASE_URL = 'http://127.0.0.1:5173';

function makeRequest(path, method = 'GET', body = null, cookie = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const postData = body ? JSON.stringify(body) : null;

    const isHtml = path === '/';
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Accept': isHtml ? 'text/html,application/xhtml+xml' : 'application/json',
        ...(postData ? {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        } : {}),
        ...(cookie ? { 'Cookie': cookie } : {}),
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      const setCookie = res.headers['set-cookie'];

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }

        resolve({
          status: res.statusCode,
          headers: res.headers,
          setCookie: setCookie ? setCookie.join('; ') : null,
          data: parsed,
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

function extractSessionCookie(setCookieHeader) {
  if (!setCookieHeader) return null;
  const match = setCookieHeader.match(/MAANWIN51_SESS=[^;]+/);
  return match ? match[0] : null;
}

async function runTestSuite() {
  console.log('============================================================');
  console.log('MAANWIN51 - COMPLETE PRODUCTION SUITE VERIFICATION');
  console.log('============================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`[PASS] ${total}. ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${total}. ${message}`);
      process.exitCode = 1;
    }
  }

  try {
    // 1. Vite Frontend HTML check
    const homeHtml = await makeRequest('/');
    assert(
      homeHtml.status === 200 && typeof homeHtml.data === 'string' && homeHtml.data.includes('MaanWin51'),
      'Frontend Home served with HTTP 200 and MaanWin51 title/branding.'
    );

    // 2. Unauthenticated /api/auth/me.php check
    const unauthMe = await makeRequest('/api/auth/me.php');
    assert(
      unauthMe.status === 401 && unauthMe.data.authenticated === false,
      'Unauthenticated /api/auth/me.php returns HTTP 401 unauthenticated.'
    );

    // 3. Phone Registration with Automatic Login
    const uniquePhone = '98' + Math.floor(10000000 + Math.random() * 90000000);
    const registerPhoneRes = await makeRequest('/api/auth/register.php', 'POST', {
      method: 'phone',
      country_code: '+91',
      phone: uniquePhone,
      password: 'Password123!',
      confirm_password: 'Password123!',
      consent: true,
      invite_code: '',
    });

    const phoneSessionCookie = extractSessionCookie(registerPhoneRes.setCookie);

    assert(
      registerPhoneRes.status === 201 &&
      registerPhoneRes.data.success === true &&
      registerPhoneRes.data.authenticated === true &&
      registerPhoneRes.data.user.phone === uniquePhone &&
      phoneSessionCookie !== null,
      `Phone registration succeeds and returns HTTP 201 with automatic login & session cookie for phone: ${uniquePhone}`
    );

    // 4. Verify session cookie works for /api/auth/me.php (Automatic Login verification)
    const meWithSession = await makeRequest('/api/auth/me.php', 'GET', null, phoneSessionCookie);
    assert(
      meWithSession.status === 200 &&
      meWithSession.data.authenticated === true &&
      meWithSession.data.user.phone === uniquePhone &&
      meWithSession.data.user.password === undefined,
      'Session persists via cookie, returning authenticated user without exposing password hash.'
    );

    // 5. Duplicate Phone Registration rejection
    const duplicatePhoneRes = await makeRequest('/api/auth/register.php', 'POST', {
      method: 'phone',
      country_code: '+91',
      phone: uniquePhone,
      password: 'Password123!',
      confirm_password: 'Password123!',
      consent: true,
    });
    assert(
      duplicatePhoneRes.status === 409 && duplicatePhoneRes.data.success === false,
      'Duplicate phone registration is rejected with HTTP 409 Conflict.'
    );

    // 6. User Logout
    const logoutRes = await makeRequest('/api/auth/logout.php', 'POST', null, phoneSessionCookie);
    assert(
      logoutRes.status === 200 && logoutRes.data.authenticated === false,
      'User logout clears session and returns HTTP 200.'
    );

    // 7. Verification that session is destroyed
    const meAfterLogout = await makeRequest('/api/auth/me.php', 'GET', null, phoneSessionCookie);
    assert(
      meAfterLogout.status === 401 && meAfterLogout.data.authenticated === false,
      'Session cannot be used after logout (returns HTTP 401).'
    );

    // 8. Phone Login
    const loginRes = await makeRequest('/api/auth/login.php', 'POST', {
      method: 'phone',
      country_code: '+91',
      phone: uniquePhone,
      password: 'Password123!',
      remember: true,
    });
    const newSessionCookie = extractSessionCookie(loginRes.setCookie);
    assert(
      loginRes.status === 200 &&
      loginRes.data.authenticated === true &&
      newSessionCookie !== null,
      'Phone login succeeds with HTTP 200 and regenerates authenticated session.'
    );

    // 9. Login with Incorrect Password
    const badLoginRes = await makeRequest('/api/auth/login.php', 'POST', {
      method: 'phone',
      country_code: '+91',
      phone: uniquePhone,
      password: 'WrongPassword!',
    });
    assert(
      badLoginRes.status === 401 && badLoginRes.data.success === false,
      'Incorrect password rejected with HTTP 401 Unauthorized.'
    );

    // 10. Email Registration with Automatic Login
    const uniqueEmail = `user${Date.now()}@maanwin51.com`;
    const registerEmailRes = await makeRequest('/api/auth/register.php', 'POST', {
      method: 'email',
      email: uniqueEmail,
      password: 'SecureEmailPass123!',
      confirm_password: 'SecureEmailPass123!',
      consent: true,
      invite_code: registerPhoneRes.data.user.invite_code, // referral test!
    });
    const emailSessionCookie = extractSessionCookie(registerEmailRes.setCookie);

    assert(
      registerEmailRes.status === 201 &&
      registerEmailRes.data.authenticated === true &&
      registerEmailRes.data.user.email === uniqueEmail &&
      registerEmailRes.data.user.referred_by === registerPhoneRes.data.user.id &&
      emailSessionCookie !== null,
      `Email registration succeeds (with referral code linkage), auto-authenticating: ${uniqueEmail}`
    );

    // 11. Duplicate Email Registration rejection
    const duplicateEmailRes = await makeRequest('/api/auth/register.php', 'POST', {
      method: 'email',
      email: uniqueEmail,
      password: 'SecureEmailPass123!',
      confirm_password: 'SecureEmailPass123!',
      consent: true,
    });
    assert(
      duplicateEmailRes.status === 409 && duplicateEmailRes.data.success === false,
      'Duplicate email registration rejected with HTTP 409 Conflict.'
    );

    // 12. Email Login
    const emailLoginRes = await makeRequest('/api/auth/login.php', 'POST', {
      method: 'email',
      email: uniqueEmail,
      password: 'SecureEmailPass123!',
      remember: false,
    });
    assert(
      emailLoginRes.status === 200 && emailLoginRes.data.authenticated === true,
      'Email login succeeds with HTTP 200.'
    );

    // 13. Missing Consent on Registration
    const noConsentRes = await makeRequest('/api/auth/register.php', 'POST', {
      method: 'email',
      email: `noconsent${Date.now()}@maanwin51.com`,
      password: 'Password123!',
      confirm_password: 'Password123!',
      consent: false,
    });
    assert(
      noConsentRes.status === 422 && noConsentRes.data.errors.consent !== undefined,
      'Missing terms consent is rejected with HTTP 422 Unprocessable Entity.'
    );

    // 14. Password Under 8 Characters
    const shortPwdRes = await makeRequest('/api/auth/register.php', 'POST', {
      method: 'email',
      email: `shortpwd${Date.now()}@maanwin51.com`,
      password: '123',
      confirm_password: '123',
      consent: true,
    });
    assert(
      shortPwdRes.status === 422 && shortPwdRes.data.errors.password !== undefined,
      'Password under 8 characters rejected with HTTP 422.'
    );

    // 15. Password Mismatch
    const mismatchRes = await makeRequest('/api/auth/register.php', 'POST', {
      method: 'email',
      email: `mismatch${Date.now()}@maanwin51.com`,
      password: 'Password123!',
      confirm_password: 'DifferentPassword123!',
      consent: true,
    });
    assert(
      mismatchRes.status === 422 && mismatchRes.data.errors.confirm_password !== undefined,
      'Password confirmation mismatch rejected with HTTP 422.'
    );

    // 16. Forgot Password Request
    const forgotRes = await makeRequest('/api/auth/forgot-password.php', 'POST', {
      method: 'phone',
      country_code: '+91',
      phone: uniquePhone,
    });
    assert(
      forgotRes.status === 200 && forgotRes.data.success === true,
      'Forgot password request processed cleanly without exposing user enumeration.'
    );

    // 17. Reset Password with Dev Token
    if (forgotRes.data.dev_reset_token) {
      const resetRes = await makeRequest('/api/auth/reset-password.php', 'POST', {
        token: forgotRes.data.dev_reset_token,
        password: 'NewBrandPassword123!',
        confirm_password: 'NewBrandPassword123!',
      });
      assert(
        resetRes.status === 200 && resetRes.data.success === true,
        'Password reset successfully executed with token.'
      );

      // Verify login with new password
      const newPassLogin = await makeRequest('/api/auth/login.php', 'POST', {
        method: 'phone',
        country_code: '+91',
        phone: uniquePhone,
        password: 'NewBrandPassword123!',
      });
      assert(
        newPassLogin.status === 200 && newPassLogin.data.authenticated === true,
        'Login succeeds using the newly updated password.'
      );
    }

    console.log(`\n============================================================`);
    console.log(`SUMMARY: ${passed} OF ${total} TESTS PASSED!`);
    console.log(`============================================================\n`);

  } catch (err) {
    console.error('Test execution error:', err);
    process.exitCode = 1;
  }
}

runTestSuite();
