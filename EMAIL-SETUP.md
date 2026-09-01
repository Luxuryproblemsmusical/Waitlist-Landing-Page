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
| Klaviyo dedicated sending domain (DKIM/SPF for Klaviyo mail) | **In progress**: `w.galoplife.com` delegated to Klaviyo nameservers; waiting on Verify in Klaviyo |

So: no new mailbox is needed (use an existing @galoplife.com address), and no
DMARC record needs to be added. The Namecheap side of step 2 is done; finish it inside Klaviyo.

## 1. Send from an @galoplife.com address, not gmail.com

1. Klaviyo → **Settings → Organization → Contact information**: sender name
   `GALOP`, sender email an existing Workspace mailbox such as
   `hello@galoplife.com` or `sydney@galoplife.com` (it must exist and
   receive replies).
2. Klaviyo → **Lists → Waitlist → Settings → Double opt-in**: open the
   confirmation email and make sure its From address matches.
3. Update `SENDER_EMAIL` in `src/app/App.tsx` so the "add us to your
   contacts" tip on the site shows the same address.

## 2. Klaviyo sending domain — delegated subdomain `w.galoplife.com`

Google's DKIM/SPF only cover mail sent *by Google*. Klaviyo sends the
confirmation email from its own servers, so it needs its own authentication
or Gmail/Yahoo/iCloud see an unauthenticated sender and spam-folder it.

Klaviyo set this up with its **delegated subdomain** method: rather than
adding CNAMEs one by one, the subdomain `w.galoplife.com` is handed to
Klaviyo's nameservers and Klaviyo publishes its own DKIM/SPF records there.

Records Klaviyo asked for (Settings → Domains → w.galoplife.com → DNS
records), all entered at Namecheap → Domain List → Manage → Advanced DNS:

| Type | Host (Namecheap field) | Value | Status 2026-09-01 |
| --- | --- | --- | --- |
| NS | `w` | `ns1.klaviyo.com` | live |
| NS | `w` | `ns2.klaviyo.com` | live |
| NS | `w` | `ns3.klaviyo.com` | live |
| NS | `w` | `ns4.klaviyo.com` | live |
| TXT | `@` | `klaviyo-site-verification=XchVzP` | live |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:sydney@galoplife.com` | live |

All six resolve from public DNS, so the Namecheap side is done. Remaining
steps, all in Klaviyo:

1. On the DNS records page, click **Verify**. If the button is greyed out,
   close the panel; the Domains page should show the domain as verified or
   "setting up".
2. Klaviyo then publishes `kl._domainkey.w.galoplife.com` and friends on its
   own nameservers. This can take a few minutes to a few hours. It's done
   when the Domains page shows the domain as the dedicated sending domain
   with no warnings.
3. Make sure the sender email used by the account and by the list's
   double opt-in email is an **@galoplife.com** address (not gmail.com).
   Mail is signed by the `w` subdomain and passes DMARC for galoplife.com
   under relaxed alignment, which is what the existing DMARC record uses.
4. Send yourself the confirmation email and open Gmail's *Show original*:
   both `dkim=pass` and `dmarc=pass` should appear, with the DKIM domain
   ending in `w.galoplife.com`.

No change to the root SPF record is needed.

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
