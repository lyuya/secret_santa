import { organiseReceivers } from './sendMailService'

describe('organiseReceivers', () => {
  const mails = [
    '111111@xxx.com',
    '111112@xxx.com',
    '111113@xxx.com',
    '111114@xxx.com',
    '111115@xxx.com',
  ]
  it('Should distribute different email address', () => {
    const res = organiseReceivers(mails, 10, 'qwer')
    const fromToAreSameAddress = res.filter(
      (request) => request.from === request.to
    )
    expect(fromToAreSameAddress).toHaveLength(0)
  })

  it('Should not return undefined', () => {
    const res = organiseReceivers(mails, 10, 'qwer')
    const toIsUndefined = res.filter((request) => request.to === undefined)
    expect(toIsUndefined).toHaveLength(0)
  })
  const samples = [
    'lyucandice@gmail.com',
    'arol@sina.com',
    'yanan.lyu@icloud.com',
    '975290722@qq.com',
  ]

  it('Should not return undefined', () => {
    const res = organiseReceivers(samples, 10, 'qwer')
    const toIsUndefined = res.filter((request) => request.to === undefined)
    expect(toIsUndefined).toHaveLength(0)
  })
})
