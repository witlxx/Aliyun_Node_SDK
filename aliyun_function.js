/**
 * 依赖模块
 */
const moment = require('moment'),
      nodeuuid = require("node-uuid"),
      urlencode = require("urlencode"),
      crypto = require("crypto"),
      co = require("co"),
      request = require("request");

let func = require("./aliyun_function.js");

module.exports = {

    //生成nonce
    "GenerateNonce": function () {
        return nodeuuid.v4();
    },

    //生成timestamp
    "GenerateTimeStamp": function  (now) {
        let expire = 3600 * 8;
        let end = parseInt(now) - expire;
        let expiration = moment(end*1000).format("YYYY-MM-DD HH:mm:ss").toString()+ "Z";
        expiration = expiration.replace(" ", "T");
        return expiration;
    },

    //生成请求的参数
    "GenerateArgs": function  (TimeStamp, Format, AccessKeyId, Action, SignatureMethod, SignatureNonce, Version, SignatureVersion, VideoId, Input) {
        let url = "AccessKeyId=" + AccessKeyId + "&Action=" + Action + "&Format=" + Format + "&Input="+ Input + "&SignatureMethod=" + SignatureMethod + "&SignatureNonce=" + SignatureNonce + "&SignatureVersion=" + SignatureVersion + "&TimeStamp=" + TimeStamp + "&Version=" + Version;
        let httpMethod = "GET";
        let stringToSign = httpMethod + "&" + percentEncode("/") + "&" + percentEncode(url);
        let arr = stringToSign.split("%3A");
        stringToSign = arr[0] + "%253A" + arr[1] + "%253A" + arr[2];
        return stringToSign;
    },

    //生成signature
    "GenerateSignature": function (AccessKeySecret, args) {
        let key = AccessKeySecret + "&";
        let signature = crypto.createHmac('sha1', key).update(args).digest().toString('base64');
        return signature;
    },

    //生成时间函数time
    "time": function (type) {
        var unixTime = (new Date()).valueOf().toString();
        switch (type) {
            case 'ms':
                return unixTime;
                break;
            case 'ss':
                return unixTime.substring(0, unixTime.length - 3);
                break;
            default:
                return unixTime.substring(0, unixTime.length - 3);
                break;
        }
    }
}

function percentEncode (value) {
    let urlEncodeOrignStr = urlencode(value, "UTF-8");
    let plusReplaced = urlEncodeOrignStr.replace("+", "%20");
    let starReplaced = plusReplaced.replace("*", "%2A");
    let waveReplaced = starReplaced.replace("%7E", "~");
    return waveReplaced;
}
