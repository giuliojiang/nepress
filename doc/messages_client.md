# Socket.io messages from client to server

All messages use socket.io event 'nepress_txt'
All messages have fields _t and _token

## Anonymous messages

### Request a new session

Can request manually a new session token, for example when the previous session has expired.
If `token` is `null`, or an expired token, the server will send a new token for the client.

```javascript
{
    _t: session_manual_refresh
}
```

### Login

```javascript
{
    _t: login_user,
    user: String,
    pass: String
}
```

### Register

```javascript
{
    _t: register_user,
    username: String,
    password: String
}
```

### Get posts

```javascript
{
    _t: home_get_posts,
    page: Number
}
```

## User messages

### Write a new post

```javascript
{
    _t: write_new_post,
    title: String,
    text: String
}
```