# 🇵🇪 Perú TV — Nuvio Addon

This version contains the authorized Peru channel streams supplied by the user.

## Channels

- Panamericana TV
- ATV+ Noticias
- ATV+ Noticias — YouTube Live
- Exitosa — stream 1
- Exitosa — stream 2
- Latina
- Cosmos TV

The addon creates three Nuvio/Stremio catalogs:

- 🇵🇪 Perú - Nacionales
- 📰 Perú - Noticias
- 📺 Perú - Regionales

## Run locally

Requires Node.js 18+.

```bash
npm install
npm start
```

Open:

```text
http://localhost:7000/manifest.json
```

## Deploy

Deploy the folder to any Node.js host. The public addon URL will be:

```text
https://YOUR-DOMAIN/manifest.json
```

Paste that URL into Nuvio's addon installer.

## Notes

The supplied streams are treated as authorized for redistribution based on the user's confirmation. Keep your authorization documentation and comply with the stream providers' terms.
