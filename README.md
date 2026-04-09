# Sorry Book V3

## Notification setup

The Yes / No buttons call `/api/response`.

To get instant email notifications on Vercel, add these Environment Variables:

- `RESEND_API_KEY`
- `NOTIFY_EMAIL` (your email address)
- Optional: `FROM_EMAIL`

If those variables are not set, the choice is still captured in the browser and written to Vercel logs, but no email is sent.

## Romantic music

This version includes a built-in ambient synth toggle made with the browser audio API.
If you want to replace it with a real song you own, add `public/music.mp3` and swap the player logic.
