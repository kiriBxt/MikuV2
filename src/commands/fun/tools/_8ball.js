const _8ball = () => {
  var fortunes = [
    "Ja!",
    "Sicherlich.",
    "Scheint so zu sein.",
    "Ohne Zweifel.",
    "Bestimmt.",
    "Du kannst darauf vertrauen.",
    "Ich denke schon.",
    "Sehr Wahrscheinlich.",
    "sieht gut aus.",
    "Die Zeichen sehen gut aus.",
    "Zu faul zum Antworten.",
    "Versuchs später nochmal.",
    "Besser du weisst es noch nicht...",
    "Kann jetzt nichts sagen.",
    "Konzentriere dich und frag nochmal.",
    "Verlass dich nicht drauf.",
    "Meine Anwtort ist nein.",
    "Meine Quellen sagen nein.",
    "Sieht nicht gut aus...",
    "Sehr zweifelhaft.",
  ];
  let answer = fortunes[Math.floor(Math.random() * fortunes.length)];
  return answer;
};
module.exports = _8ball;
