var KEY = process.env.KEY || 'your_key';
var SECRET = process.env.SECRET || 'your_secret';
var TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN || 'twitter_access_token';
var TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET || 'twitter_access_token_secret';
var ULR_MONGO =  process.env.ULR_MONGO || 'twitter_access_token_secret';


var config={
    twitter:{
                key: KEY,
                secret:SECRET,
        
               TWITTER_ACCESS_TOKEN: TWITTER_ACCESS_TOKEN,
               TWITTER_ACCESS_TOKEN_SECRET: TWITTER_ACCESS_TOKEN_SECRET
       }
        ,conectDB:{
                link:ULR_MONGO
                			
    }
  
};


module.exports= config;


