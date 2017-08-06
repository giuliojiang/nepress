# Socket.io messages from server to client

All messages use socket.io event 'nepress_txt'

## Anonymous messages

### Send a new session token to the client

```javascript
{
    _t: new_token,
    token: String
}
```

### Signal that the session has expired

The client will need to request a new session

```javascript
{
    _t: refresh_session
}

### Generic alert (displayed as Toast)

```javascript
{
    _t: alert,
    msg: String
}
```

## User messages
