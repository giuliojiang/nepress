# Socket.io messages from client to server

All messages use socket.io event 'nepress_txt'

## Anonymous messages

### Request homepage posts to be displayed

```javascript
{
    _t: home_get_posts
}
```

### Request a new session

Can request manually a new session token, for example when the previous session has expired

```javascript
{
    _t: session_manual_refresh
}
```

### Login

```javascript
{
    _t: home_login,
    user: String,
    pass: String
}
```

## User messages
