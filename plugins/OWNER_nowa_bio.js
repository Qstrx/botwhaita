const handler = async (m, {conn, text, usedPrefix, command, isOwner}) => {
  if (!text) throw `boss di dark souls obeso metti un numero valido`;
  if (!text.match(/x/g)) throw `*Example :* ${usedPrefix + command} ${m.sender.split('@')[0]}x`;
  if (text.match(/x/g).length > 4 && !isOwner) throw `troppe x un po come i cazzi dentro tua nonna!!! !`;
  const detect = text.replace(/[^0-9|x]/g, '');
  if (detect.length < 5) throw `Negro di merda ritorna nel cotone`;
  await m.reply(wait);
  const data = await nowa(conn, detect);
  const txt = '\t*• 2009 •*\n' + data.filter((v) => v.exists && !/Date/.test(v.setAt) && /09$/.test(v.setAt))
      .map((v) => `No : @${splitM(v.jid)}\nBio : ${v.status || ''}\nDate : ${v.setAt}`).join('\n\n') +
	'\n\n\t*• 2010 •*\n' + data.filter((v) => v.exists && !/Date/.test(v.setAt) && /10$/.test(v.setAt))
      .map((v) => `No : @${splitM(v.jid)}\nBio : ${v.status || ''}\nDate : ${v.setAt}`).join('\n\n') +
	'\n\n\t*• 2011 •*\n' + data.filter((v) => v.exists && !/Date/.test(v.setAt) && /11$/.test(v.setAt))
      .map((v) => `No : @${splitM(v.jid)}\nBio : ${v.status || ''}\nDate : ${v.setAt}`).join('\n\n') +
	'\n\n\t*• 2012 •*\n' + data.filter((v) => v.exists && !/Date/.test(v.setAt) && /12$/.test(v.setAt))
      .map((v) => `No : @${splitM(v.jid)}\nBio : ${v.status || ''}\nDate : ${v.setAt}`).join('\n\n');
  m.reply(txt, '', {mentions: data.map((x) => x.jid)});
};

handler.help = ['Bio'];
handler.tags = ['info'];
handler.owner = true;
handler.command = /^bio$/i;


export default handler;

function splitM(num) {
  return num.split('@')[0];
}

function formatDate(n, locale = 'id') {
  n = +n;
  if (n == 0) n = NaN;
  const d = new Date(n);
  return d.toLocaleDateString(locale, {timeZone: 'Asia/Jakarta'});
}

export async function nowa(client, num) {
  const random = num.match(/x/g).length; const total = Math.pow(10, random); const arr = [];
  for (let i = 0; i < total; i++) {
    const list = [...i.toString().padStart(random, '0')]; const result = num.replace(/x/g, () => list.shift()) + '@s.whatsapp.net';
    if (await client.onWhatsApp(result).then((v) => (v[0] || {}).exists)) {
      const info = await client.fetchStatus(result).catch(() => {}) || {};
      info.setAt = formatDate(info?.setAt);
      arr.push({exists: true, jid: result, ...info});
    } else {
      arr.push({exists: false, jid: result});
    }
  }
  return arr;
}
