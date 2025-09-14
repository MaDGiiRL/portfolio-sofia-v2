// api/contact.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

function isEmail(v) {
    return /^\S+@\S+\.\S+$/.test(v || '');
}

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { name, email, message, bot } = req.body || {};

        if (bot) return res.status(400).json({ error: 'Spam rilevato' });
        if (!name || !name.trim()) return res.status(400).json({ error: 'Nome richiesto' });
        if (!isEmail(email)) return res.status(400).json({ error: 'Email non valida' });
        if (!message || message.trim().length < 10) {
            return res.status(400).json({ error: 'Messaggio troppo corto' });
        }

        const text = `
Nuovo messaggio dal sito:

Nome: ${name}
Email: ${email}

Messaggio:
${message}
    `;

        const data = await resend.emails.send({
            from: process.env.FROM_EMAIL,   
            to: process.env.TO_EMAIL,       
            reply_to: email,
            subject: `Nuovo contatto: ${name}`,
            text,
        });

        return res.status(200).json({ ok: true, id: data?.id });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Errore server nell’invio email' });
    }
};
