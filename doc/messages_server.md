# Socket.io messages from server to client

All messages use socket.io event 'nepress_txt'
All messages have fields _t

## Anonymous messages

### Send a new session token to the client

```javascript
{
    _t: new_token,
    token: String,
    username: String
}
```

If the token corresponds to an already-logged in user, username is not null.

### Generic alert (displayed as Toast)

```javascript
{
    _t: alert,
    msg: String
}
```

### Refresh session (expired)

```javascript
{
    _t: refresh_session
}
```

### Home, send post list

```javascript
{
    _t: home_send_posts,
    page: Number,
    posts: [
        {
            title: String,
            date: Date as milliseconds number,
            text: String
        }
    ]
}
```

## User messages

### Login success

```javascript
{
    _t: login_success,
    token: String,
    username: String
}
```

Sends the new token for a logged in user, and the username for display.

### New post submitted

```javascript
{
    _t: write_new_post_submitted
}
```