export type SubmitResult = { ok: true } | { ok: false; reason: 'missing-key' | 'api-error' | 'network-error' }

export async function submitToWeb3Forms(formData: FormData, extra?: Record<string, string>): Promise<SubmitResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

  if (!accessKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('NEXT_PUBLIC_WEB3FORMS_KEY is not set — form submissions will not be delivered. See .env.example.')
    }
    return { ok: false, reason: 'missing-key' }
  }

  formData.append('access_key', accessKey)
  if (extra) {
    for (const [key, value] of Object.entries(extra)) formData.append(key, value)
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
    const json = await res.json()
    return json.success ? { ok: true } : { ok: false, reason: 'api-error' }
  } catch {
    return { ok: false, reason: 'network-error' }
  }
}
