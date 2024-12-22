export interface MailRequest {
  name: string
  from: string
  to: string
  value: number
}

export interface MailJetRequest {
  FromEmail: string
  FromName: string
  Subject: string
  'Text-part': string
  'Html-part': string
  Recipients: { Email: string }[]
}
