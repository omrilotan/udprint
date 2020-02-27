# udprint: UDP Logger [![](https://img.shields.io/npm/v/udprint.svg?style=flat-square)](https://www.npmjs.com/package/udprint) ![](https://img.shields.io/github/workflow/status/omrilotan/udprint/Publish?style=flat-square)
## 💡 Log incoming messages on a user datagram protocol (UDP) socket

```
$ npx udprint 8125
```

## interactive
```bash
$ udprint -i
```

![](https://user-images.githubusercontent.com/516342/75452841-9f7f7000-597b-11ea-8c7f-f54c49a81265.gif)

Full params
```bash
$ udprint 8125 127.0.0.1
           ↑    ↑
          port address
```

With explicit params you can switch the order
```bash
$ udprint --port 8125 --address 127.0.0.1
$ udprint --address 127.0.0.1 --port 8125 --encoding utf8
```

Params support shorthand
```bash
$ udprint -p 8125 -h 127.0.0.1 -e utf8
```

Get help (full feature list)
```bash
$ udprint -h
```

Encoding can be one of the following:
- `utf8` (default)
- `ascii`
- `binary`
- `latin1`
- `ucs2` (alias of utf16le)
- `utf16le`
- `hex`
- `base64`
