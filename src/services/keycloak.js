import Keycloak from 'keycloak-js';

export default Keycloak({
  "realm": process.env.REACT_APP_KC_REALM,
  "url": process.env.REACT_APP_KC_URL,
  "ssl-required": process.env.REACT_APP_KC_SSL_REQUIRED,
  "clientId": process.env.REACT_APP_KC_CLIENT_ID,
  "public-client": process.env.REACT_APP_KC_PUBLIC_CLIENT,
  "verify-token-audience": process.env.REACT_APP_KC_VERIFY_TOKEN_AUDIENCE,
  "credentials": {
    "secret": process.env.REACT_APP_KC_SECRET
  },
  "use-resource-role-mappings": process.env.REACT_APP_KC_USE_RESOURCE_ROLE_MAPPINGS,
  "confidential-port": process.env.REACT_APP_KC_CONFIDENTIAL_PORT
});