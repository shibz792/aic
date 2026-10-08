# Email HTML patterns

Copy-pasteable, hand-verified markup for the mechanics every marketing
email needs. Adjust colors/sizes/copy; don't rebuild the mechanics from
scratch — each of these exists because a simpler version breaks in some
real client.

## Table of contents

1. Document head (DOCTYPE, meta, MSO style reset)
2. Hidden preheader
3. Outer MSO table wrapper
4. Bulletproof CTA button (with VML fallback)
5. Responsive `<style>` block
6. Dark-surface section (bgcolor + inline, belt-and-suspenders)
7. Label/value details block

---

## 1. Document head

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>Subject-equivalent title here</title>
<!--[if mso]>
<style type="text/css">
  table,td,div,p,a,h1,h2,h3{font-family:Arial,Helvetica,sans-serif !important;}
  .serif{font-family:Georgia,'Times New Roman',serif !important;}
</style>
<![endif]-->
<style type="text/css">
  :root{color-scheme:light;supported-color-schemes:light;}
  html,body{margin:0 !important;padding:0 !important;height:100% !important;width:100% !important;}
  *{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}
  table,td{mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;border-collapse:collapse !important;}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;display:block;}
  a{text-decoration:none;}
  body{background:#f1f0ec;} <!-- match to the design's outer background -->
</style>
</head>
```

The `.serif` class + MSO style block is only needed if the design uses a
serif display face — Outlook needs the `!important` override because it
otherwise substitutes its own default font regardless of inline styles in
some versions.

## 2. Hidden preheader

Goes immediately inside `<body>`, before the visible content. The
zero-width-joiner + `&nbsp;` repeats pad out the preheader so the client
doesn't fall through into visible body text to fill the preview snippet.

```html
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#f1f0ec;opacity:0;">
  Write the actual preheader hook here — extends the subject line's promise.
  &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>
```

The `color` must match the outer body background exactly, or it can
flash visible for a moment in some clients.

## 3. Outer MSO table wrapper

Outlook needs an explicit fixed-width table or the layout can collapse
to full browser/client width instead of respecting the design's max-width.
Wrap the real content table in this:

```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f0ec;">
  <tr>
    <td align="center" style="padding:34px 12px 40px 12px;">

      <!--[if mso]>
      <table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td>
      <![endif]-->

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="container" style="width:600px;max-width:600px;">
        <!-- real content rows go here -->
      </table>

      <!--[if mso]>
      </td></tr></table>
      <![endif]-->

    </td>
  </tr>
</table>
```

`class="container"` pairs with `.container{width:100% !important;}` in
the responsive `<style>` block (section 5) so modern clients fluid-resize
on mobile, while the MSO-only nested table keeps Outlook pinned at 600px
(Outlook ignores the `@media` rule entirely, so it needs its own fixed
width rather than relying on the responsive override).

## 4. Bulletproof CTA button

Every button in the email should use this pattern — a real styled `<a>`
for every modern client, a VML rounded-rect for Outlook (which otherwise
renders the `<a>` as unstyled underlined text with no background/padding).

```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" class="btn">
  <tr>
    <td align="center" bgcolor="#00b388" style="background:#00b388;border-radius:11px;">
      <!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="PASTE_THE_REAL_LINK_HERE" style="height:51px;v-text-anchor:middle;width:240px;" arcsize="20%" strokecolor="#00b388" fillcolor="#00b388">
      <w:anchorlock/>
      <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Button label</center>
      </v:roundrect>
      <![endif]-->
      <!--[if !mso]><!-->
      <a href="PASTE_THE_REAL_LINK_HERE" style="display:inline-block;padding:17px 44px;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:16px;font-weight:700;color:#ffffff;border-radius:11px;letter-spacing:0.2px;">Button label</a>
      <!--<![endif]-->
    </td>
  </tr>
</table>
```

**Note the two href values are independent** — if the link changes,
update it in both the VML block and the real anchor, or Outlook users and
everyone else land on different URLs. Grep for the link text after
building to confirm both instances match.

`<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">`
on the root `<html>` tag is required for the VML namespace to resolve —
without it some Outlook versions silently fail to render the roundrect at
all.

## 5. Responsive `<style>` block

```html
<style type="text/css">
  @media only screen and (max-width:600px){
    .container{width:100% !important;}
    .px{padding-left:26px !important;padding-right:26px !important;}
    .h1{font-size:28px !important;line-height:35px !important;}
    .stack{display:block !important;width:100% !important;}
    .stack-pad{padding:0 0 20px 0 !important;}
    .btn a{display:block !important;}
    .logo-a{height:40px !important;width:auto !important;}
    .logo-b{height:40px !important;width:auto !important;}
  }
</style>
```

Add classes to this block as the design needs them — the pattern is
always "give the element a class, override only the properties that need
to change at the breakpoint." Remember this entire block is a bonus for
clients that honor `@media` (Gmail app, Apple Mail, most modern webmail);
Outlook and some older/corporate webmail clients ignore it completely, so
nothing here should be load-bearing for basic usability.

## 6. Dark-surface section

A solid dark background section (not a gradient — gradients need a solid
fallback color besides) still needs the belt-and-suspenders attribute +
inline-style pairing, same as any other color in email:

```html
<td bgcolor="#0b0f1f" style="background:#0b0f1f;padding:40px 48px;">
  <!-- content -->
</td>
```

The `bgcolor` HTML attribute (not just the CSS `background` property) is
what old Outlook actually honors for solid colors — always include both.

## 7. Label/value details block

For date/time/venue, price/terms, or any short list of facts — reads
cleaner than burying the same information in a sentence, and is easy to
scan on mobile.

```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:10.5px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#9a9486; width:70px;" valign="top">Label</td>
    <td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:14.5px; color:#0b0f1f;">Value text</td>
  </tr>
  <!-- repeat per row -->
</table>
```
