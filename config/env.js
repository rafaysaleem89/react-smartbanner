/* eslint-disable no-var, arrow-parens, prefer-template */
// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  var NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');

  const DEVELOPMENT = NODE_ENV === JSON.stringify('development');
  const SERVER = false;
  const CLIENT = true;
  const BUILD_NAME = JSON.stringify(process.env.BUILD_NAME || 'dev');

  const processEnv = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = JSON.stringify(process.env[key]); // eslint-disable-line no-param-reassign

        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV,
        BUILD_NAME,
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: JSON.stringify(publicUrl),
      }
    );

  return {
    'process.env': processEnv,
    __SERVER__: SERVER,
    __CLIENT__: CLIENT,
    __DEVELOPMENT__: DEVELOPMENT,
  };
}

module.exports = getClientEnvironment;
