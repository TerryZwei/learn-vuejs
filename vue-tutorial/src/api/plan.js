const _plans = [
  {
    name: 'Terry',
    avatar: 'https://avatars0.githubusercontent.com/u/11518187?v=3&s=460',
    date: '2016-11-11',
    totalTime: 1,
    comment: '剁手节'
  }
]

export default {
  getAllPlans (cb) {
    setTimeout(() => {
      cb(_plans)
    }, 1000)
  }
}
