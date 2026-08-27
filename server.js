const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;

const channels = [
  {
    id: "america-tv",
    name: "América Televisión",
    group: "Perú - Nacionales",
    url: "https://tvgo.americatv.com.pe/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/America_Televisi%C3%B3n-logo%2C_Tv_port%C3%A1til.svg",
    epg_id: "America.pe"
  },
  {
    id: "willax",
    name: "Willax Televisión",
    group: "Perú - Nacionales",
    url: "https://willax.pe/en-vivo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/73/Willax_TelevisixC3%B3n.png",
    epg_id: "Willax.pe"
  },
  {
    id: "atv",
    name: "ATV Perú",
    group: "Perú - Nacionales",
    url: "https://www.atv.pe/envivo-atv/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/ATV_logo_2020.png",
    epg_id: "ATV.pe"
  },
  {
    id: "panamericana-tv-pe",
    name: "Panamericana TV",
    group: "Perú - Nacionales",
    url: "http://45.171.108.253:8888/PANAMERICANA/index.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Panamericana_tv_2009.png",
    epg_id: "PanamericanaTV.pe"
  },
  {
    id: "atv-plus-noticias-pe",
    name: "ATV+ Noticias",
    group: "Perú - Noticias",
    url: "http://45.171.108.253:8888/ATV/index.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Atv_noticias_logo.png",
    epg_id: "ATVPlus.pe"
  },
  {
    id: "atv-plus-noticias-youtube",
    name: "ATV+ Noticias Ⓨ",
    group: "Perú - Noticias",
    url: "https://www.youtube.com/c/ATVNoticiasOficial/live",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Atv_noticias_logo.png",
    epg_id: "ATVPlus.pe",
    youtube: true
  },
  {
    id: "exitosa-pe-1",
    name: "Exitosa (ex-Karibeña)",
    group: "Perú - Noticias",
    url: "http://187.102.210.46/KARIBENA/index.m3u8",
    logo: "https://i.pinimg.com/280x280_RS/11/85/b6/1185b667fe3f80d7072359d7ce7ce52d.jpg",
    epg_id: "Exitosa.pe"
  },
  {
    id: "exitosa-pe-2",
    name: "Exitosa (ex-Karibeña)",
    group: "Perú - Noticias",
    url: "http://190.93.224.42/EXITOSA/index.m3u8",
    logo: "https://i.pinimg.com/280x280_RS/11/85/b6/1185b667fe3f80d7072359d7ce7ce52d.jpg",
    epg_id: "Exitosa.pe"
  },
  {
    id: "latina-pe",
    name: "Latina",
    group: "Perú - Nacionales",
    url: "https://redirector.rudo.video/hls-video/567ffde3fa319fadf3419efda25619456231dfea/latina/latina.smil/playlist.m3u8",
    logo: "https://graph.facebook.com/Latina.pe/picture?width=200&height=200",
    epg_id: "Latina.pe"
  },
  {
    id: "cosmos-tv-pe",
    name: "Cosmos TV",
    group: "Perú - Regionales",
    url: "https://videoserver.tmcreativos.com:19360/tvcosmos/tvcosmos.m3u8",
    logo: "https://pbs.twimg.com/profile_images/1904206504753811457/66CbqvH1_200x200.jpg",
    epg_id: "CosmosTV.pe"
  }
];

const manifest = {
  id: "com.perutv.nuvio",
  version: "1.1.0",
  name: "🇵🇪 Perú TV",
  description: "Peruvian live TV channels for Nuvio/Stremio.",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Flag_of_Peru.svg/512px-Flag_of_Peru.svg.png",
  resources: ["catalog", "meta", "stream"],
  types: ["tv"],
  idPrefixes: ["pe-tv:"],
  catalogs: [
    { type: "tv", id: "peru-national", name: "🇵🇪 Perú - Nacionales" },
    { type: "tv", id: "peru-news", name: "📰 Perú - Noticias" },
    { type: "tv", id: "peru-regional", name: "📺 Perú - Regionales" }
  ],
  behaviorHints: { configurable: false }
};

function metaFor(c) {
  return {
    id: "pe-tv:" + c.id,
    type: "tv",
    name: c.name,
    poster: c.logo,
    posterShape: "landscape",
    description: `${c.name} — señal en vivo`
  };
}

app.get("/", (_req, res) => res.send(`
<html><head><title>🇵🇪 Perú TV</title></head>
<body style="font-family:Arial;padding:30px">
<h1>🇵🇪 Perú TV</h1>
<p>Nuvio/Stremio live-TV addon.</p>
<p><a href="/manifest.json">Install addon</a></p>
</body></html>`));

app.get("/manifest.json", (_req,res) => res.json(manifest));

app.get("/catalog/tv/:catalogId.json", (req,res) => {
  const map = {
    "peru-national": "Perú - Nacionales",
    "peru-news": "Perú - Noticias",
    "peru-regional": "Perú - Regionales"
  };
  const group = map[req.params.catalogId];
  res.json({ metas: channels.filter(c => c.group === group).map(metaFor) });
});

app.get("/meta/tv/:id.json", (req,res) => {
  const id = req.params.id.replace(/^pe-tv:/,"");
  const c = channels.find(x => x.id === id);
  res.json({ meta: c ? metaFor(c) : null });
});

app.get("/stream/tv/:id.json", (req,res) => {
  const id = req.params.id.replace(/^pe-tv:/,"");
  const c = channels.find(x => x.id === id);
  if (!c) return res.json({streams: []});

  const stream = {
    name: c.youtube ? "YouTube Live" : "🇵🇪 En vivo",
    title: c.name,
    url: c.url,
    behaviorHints: { notWebReady: true }
  };
  res.json({ streams: [stream] });
});

app.listen(PORT, () => console.log(`Perú TV addon running on port ${PORT}`));
