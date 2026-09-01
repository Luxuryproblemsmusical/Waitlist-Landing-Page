# Waitlist email: confirmation + deliverability checklist

The signup form posts to a Klaviyo list (`WNWyrF`) that uses **double opt-in**:
nobody is on the list until they click the link in the confirmation email.
The site now tells people that ("Check your inbox") and shows a "You're on the
list" state when they land back on `/?confirmed=1`.

The site can only *tell* people to look in spam. Whether the email actually
lands in the inbox is decided in Klaviyo and DNS. Work through this list in
order; step 2 is the one that fixes "it's going to spam right now".

## Current state (checked 2026-09-01)

| Item | Status |
| --- | --- |
| DNS host for galoplife.com | **Namecheap** (nameservers `dns1/dns2.registrar-servers.com`) |
| Mailboxes on galoplife.com | **Google Workspace** already set up (MX `smtp.google.com`, SPF + DKIM for Google present) |
| DMARC | **Already present**: `v=DMARC1; p=none; rua=mailto:sydney@galoplife.com` |
| Klaviyo site verification TXT | Present |
| Klaviyo dedicated sending domain (DKIM/SPF for Klaviyo mail) | **Missing** — this is the fix |

So: no new mailbox is needed (use an existing @galoplife.com address), and no
DMARC record needs to be added. The one thing to do is step 2.

## 1. Send from an @galoplife.com address, not gmail.com

1. Klaviyo → **Settings → Organization → Contact information**: sender name
   `GALOP`, sender email an existing Workspace mailbox such as
   `hello@galoplife.com` or `sydney@galoplife.com` (it must exist and
   receive replies).
2. Klaviyo → **Lists → Waitlist → Settings → Double opt-in**: open the
   confirmation email and make sure its From address matches.
3. Update `SENDER_EMAIL` in `src/app/App.tsx` so the "add us to your
   contacts" tip on the site shows the same address.

## 2. Add Klaviyo's sending domain at Namecheap (DKIM + SPF for Klaviyo)

Google's DKIM/SPF only cover mail sent *by Google*. Klaviyo sends the
confirmation email from its own servers, so it needs its own records or
Gmail/Yahoo/iCloud see an unauthenticated sender and spam-folder it.

**In Klaviyo**

1. **Settings → Domains** (under Account) → **Add domain** (or "Set up a
   dedicated sending domain").
2. Root domain: `galoplife.com`. Sending subdomain: accept the suggested
   `send`, giving `send.galoplife.com`.
3. Klaviyo shows a table of 3–4 records, all type **CNAME**, with hostnames
   like `kl._domainkey.send.galoplife.com`, `kl2._domainkey.send.galoplife.com`
   and `send.galoplife.com` (the exact values are generated per account —
   copy them from the screen, don't retype from memory). Leave this tab open.

**In Namecheap**

1. Log in → **Domain List** → **Manage** next to galoplife.com → **Advanced
   DNS** tab.
2. For each record Klaviyo listed, click **Add New Record**:
   - Type: **CNAME Record**
   - Host: the hostname **without** `.galoplife.com` on the end. Namecheap
     appends the domain itself. So `kl._domainkey.send.galoplife.com` is
     entered as `kl._domainkey.send`, and `send.galoplife.com` as `send`.
     Entering the full hostname produces `...galoplife.com.galoplife.com`
     and verification fails.
   - Value / Target: exactly what Klaviyo shows (ends in something like
     `.klaviyodns.com`; a trailing dot is fine).
   - TTL: Automatic.
   - Click the green check to save each row.
3. Don't delete anything that's already there (the Google MX, the existing
   TXT records, the Vercel records for the website).

**Back in Klaviyo**

4. Wait 5–30 minutes, then click **Verify** on the Domains page. If it fails,
   re-check the Host field for the doubled-domain mistake above and try again
   after a few minutes; Namecheap can take up to an hour.
5. Once verified, set the new domain as the default sending domain, then send
   yourself a test of the confirmation email and confirm the header shows
   `dkim=pass` and `dmarc=pass` (Gmail: open the message → ⋮ → *Show
   original*).

No change to the root SPF record is needed: the sending subdomain's CNAME
carries Klaviyo's SPF.

## 2b. DMARC — already done, optionally tighten later

The record exists at `_dmarc.galoplife.com` with `p=none` (monitor only)
reporting to sydney@galoplife.com. Leave it as is until step 2 is verified
and a couple of weeks of clean sending have passed, then change it at
Namecheap (Advanced DNS → edit the TXT record with host `_dmarc`) to:

```
v=DMARC1; p=quarantine; rua=mailto:sydney@galoplife.com; adkim=r; aspf=r
```

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
