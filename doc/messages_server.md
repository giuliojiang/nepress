# Socket.io messages from server to client

All messages use socket.io event 'nepress_txt'
All messages have fields _t

## Anonymous messages

### Send a new session token to the client

```javascript
{
    _t: new_token,
    token: String
}
```

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
    token: String
}
```

### New post submitted

```javascript
{
    _t: write_new_post_submitted
}
```