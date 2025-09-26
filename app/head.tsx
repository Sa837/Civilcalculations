export default function Head() {
  const gsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  return (
    <>
      {gsc ? <meta name="google-site-verification" content={gsc} /> : null}
      {adsenseClient ? <meta name="google-adsense-account" content={adsenseClient} /> : null}
      {/* Canonical is defined per-page via metadata.alternates.canonical */}
    </>
  )
}
