var request = require('request');

module.exports = {
    // get the latest news
    getLast: function(req, res){
        request.get('http://news.at.zhihu.com/api/4/news/latest', function(err, resp, body){
            if (!err && resp.statusCode === 200) {
                res.json({code:0,msg:'success',data: JSON.parse(resp.body)});
            } else {
                sails.log.error(err);
                res.json({code:1,msg:err})
            }
        });
    },
    _config: {
    rest: true,
    actions: true,
    shortcuts: true
  }
}