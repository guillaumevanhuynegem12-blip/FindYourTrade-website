export function waitlistEmailHtml(): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="padding:36px 40px 8px 40px;text-align:center;">
                <svg width="44" height="44" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <g transform="translate(50 50)">
                    ${logoBars()}
                  </g>
                </svg>
                <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:20px;font-weight:600;color:#18181B;margin-top:8px;letter-spacing:-0.01em;">fyt</div>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 40px 32px 40px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#27272A;line-height:1.6;font-size:16px;">
                <h1 style="font-size:26px;font-weight:600;color:#18181B;margin:0 0 18px 0;line-height:1.25;letter-spacing:-0.01em;">You&rsquo;re on the waitlist.</h1>
                <p style="margin:0 0 16px 0;">Welcome to <strong>findyourtrade</strong>.</p>
                <p style="margin:0 0 16px 0;">As an early member, you&rsquo;ll get <strong>free access to fyt until the public launch</strong>. Early members are invited in the order they signed up &mdash; the earlier you joined, the sooner you&rsquo;re in.</p>
                <p style="margin:0 0 16px 0;">One ask: while you&rsquo;re testing it, we&rsquo;d love your honest feedback &mdash; what works, what doesn&rsquo;t, what&rsquo;s missing. Reply to this email any time. Every reply gets read.</p>
                <p style="margin:0 0 24px 0;">And if you&rsquo;d be willing to leave a short <strong>review of the site</strong> while you&rsquo;re at it, that would mean a lot.</p>
                <p style="margin:0;">&mdash; The fyt team</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px;border-top:1px solid #e4e4e7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;color:#71717a;text-align:center;">
                <a href="https://findyourtrade.eu" style="color:#7C3AED;text-decoration:none;">findyourtrade.eu</a><br/>
                You received this because you joined the fyt waitlist.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function logoBars(): string {
  const splay = 22;
  const bar = (rot: number) =>
    `<rect x="-7" y="-44" width="14" height="30" rx="7" fill="#A855F7" transform="rotate(${rot})"/>`;
  const directions = [0, 90, 180, 270];
  return directions
    .map((dir) => `<g transform="rotate(${dir})">${bar(-splay)}${bar(splay)}</g>`)
    .join("");
}
