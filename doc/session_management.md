# Session management

## Anonymous sessions

The client requests an initial token, and the server will respond with one.
A token is valid for 48 hours, but it is refreshed every time the user uses it.
The token is used keep a state on the server side.
If the token expires, it is not valid anymore and the client will need to request a new one, possibly logging in again.

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

## Session data object

It has the following properties

* username (optional) - the username of the logged in user associated to the session token