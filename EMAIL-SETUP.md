# Waitlist email: confirmation + deliverability checklist

The signup form posts to a Klaviyo list (`WNWyrF`) that uses **double opt-in**:
nobody is on the list until they click the link in the confirmation email.
The site now tells people that ("Check your inbox") and shows a "You're on the
list" state when they land back on `/?confirmed=1`.

The site can only *tell* people to look in spam. Whether the email actually
lands in the inbox is decided in Klaviyo and DNS. Work through this list in
order; steps 1 and 2 are the ones that fix "it's going to spam right now".

## 1. Stop sending from a gmail.com address (biggest fix)

The confirmation email currently goes out from `galoplife@gmail.com` through
Klaviyo's servers. Gmail, Yahoo and iCloud treat a third party sending "from"
gmail.com as spoofing and route it to spam. Since 2024 Gmail and Yahoo also
require bulk senders to use an authenticated domain of their own.

1. Create a real mailbox on the brand domain, e.g. `hello@galoplife.com`
   (Google Workspace, or whatever hosts the domain's email). It must be able
   to receive replies.
2. Klaviyo → **Settings → Organization → Contact information**: set the
   default sender name to `GALOP` and sender email to `hello@galoplife.com`.
3. Klaviyo → **Lists → Waitlist → Settings → Double opt-in**: open the
   confirmation email and set its From address to the same mailbox.
4. Update `SENDER_EMAIL` in `src/app/App.tsx` so the "add us to your contacts"
   tip on the site shows the new address.

## 2. Authenticate the domain (DKIM / SPF / DMARC)

1. Klaviyo → **Settings → Domains → Add domain**: enter `galoplife.com` and
   pick a subdomain for sending (Klaviyo suggests `send.galoplife.com`).
2. Klaviyo shows 3–4 DNS records (CNAMEs for DKIM, plus one for the return
   path). Add them exactly at the DNS host for galoplife.com, then click
   **Verify** in Klaviyo. This covers DKIM and SPF alignment.
3. Add a DMARC record at the DNS host. Start in monitoring mode:

   ```
   Host:  _dmarc.galoplife.com
   Type:  TXT
   Value: v=DMARC1; p=none; rua=mailto:hello@galoplife.com; adkim=r; aspf=r
   ```

   After a couple of weeks of clean reports, tighten to `p=quarantine`.
4. Check with https://www.mail-tester.com : send the confirmation email to the
   address it gives you and aim for 9/10 or better. It names anything still
   missing (SPF, DKIM, DMARC, list-unsubscribe, missing physical address).

## 3. Tune the double opt-in flow in Klaviyo

Klaviyo → **Lists → Waitlist → Settings → Double opt-in**.

- **Confirmation email**: subject `Confirm your spot on the GALOP waitlist`,
  one short line, one button. Plain emails with one link confirm better and
  are less likely to be flagged than image-heavy ones.
- **Confirmation page** (the page Klaviyo sends people to after they click):
  set it to `https://galoplife.com/?confirmed=1`. The site shows the
  "You're on the list" card at that URL.
- **Subscribe page / already-subscribed page**: leave Klaviyo's defaults; the
  site handles the "check your inbox" message itself.
- Keep the physical mailing address in Klaviyo's contact info filled in. It
  goes in the email footer and is a CAN-SPAM requirement; missing it is a
  spam signal.

## 4. Before the launch blast

- Send test copies of the launch email to a Gmail, an Outlook, a Yahoo and an
  iCloud address and confirm they land in the inbox (Promotions is fine).
- Sign up for Google Postmaster Tools (https://postmaster.google.com) with the
  domain to watch spam rate and reputation. Keep the reported spam rate under
  0.1%.
- If the list is large, send the first big campaign in a few batches over a
  couple of days rather than all at once, so the new domain builds reputation.
- Suppress profiles that never confirmed after ~30 days.
- Avoid link shorteners, ALL-CAPS subjects and subjects starting with "Free".
