# Session management

## Anonymous sessions

The server sends an initial token when a connection from the client is received.

The client can start sending requests once a token is received.

The token is used keep a state on the server side. A session is timed and lasts 2 hours, after which the user is required to refresh the page.

Each session is kept on the server with the following information:

```
{
    timeout_handle
    data
}
```

The `timeout_handle` is used to refresh the timeout token that will set the session's expiration after the timeout time.

## Logged user sessions

The state is saved in the same way in the server.

To login, the user sends a login message with username and password. If the login is successful, the server will cancel the anonymous session token and create a new token for the logged in user.