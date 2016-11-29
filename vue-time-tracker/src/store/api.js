const data = [
  {
    name: 'Terry',
    email: 'gyweizhiwei@gmail.com',
    image: 'https://avatars0.githubusercontent.com/u/11518187?v=3&s=460',
  },
];

export default {
  getAllData(cb) {
    setTimeout(() => { cb(data); }, 1000);
  },
};
