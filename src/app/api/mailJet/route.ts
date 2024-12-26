'use server'

import { MailJetRequest, MailRequest } from '@/app/model/mailRequest'

const sendMail = async (mails: MailRequest[]) => {
  const mailsTemplates: MailJetRequest[] = mails.map((mail) => ({
    FromEmail: 'yanan.lyu6@gmail.com',
    FromName: 'Secret Santa',
    Subject: 'Here is your secret !',
    'Text-part': 'Secret is coming !',
    'Html-part': `
        <div><h1>Hello !</h1></div>
        <div>Here is your secret from ${mail.name}</div>
        <div><h3>Your secret receiver is: ${mail.to}.</h3></div>
        <div><h3>Please prepare a gift with value around ${mail.value} euros.</h3></div>`,
    Recipients: [{ Email: mail.from }],
  }))

  return await fetch('https://api.mailjet.com/v3/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(process.env.MAILJET_APIKEY + ':' + process.env.MAILJET_SECRET)}`,
    },
    body: JSON.stringify({ Messages: mailsTemplates }),
  })
}
export async function POST(req: Request) {
  const { recipients } = await req.json()

  if (!recipients) {
    console.error('recipients field is empty !')
  }
  const res = await sendMail(recipients)
  if (res.status === 200) console.log('success!')

  return res
}
