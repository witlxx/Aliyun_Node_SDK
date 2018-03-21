const urlencode = require("urlencode");
let Ali_Node_SDK = require("./aliyun_openapi.js");
let func = require("./aliyun_function.js");

/**
 * 阿里云公共参数:
 *  1.timestamp 时间戳
 *  2.format 获取格式,xml或json
 *  3.accessKeyId 阿里云KeyId
 *  4.accessKeySecret 阿里云KeySecret 身份标识
 *  5.action 阿里云提供的公开接口
 *  6.signatureMethod 签名方法,现在为Hmac-SHA1方法
 *  7.pipelineId 管道id,可以从控制台获取
 *  8.nonce 生成的随机参数
 *  9.version 公开接口的版本,要与工单确认
 *  10.guid 所查询的oss存储对象的名称或者地址
 *  11.input 查找的oss地址信息,注意要进行utf-8编码
 *  12.url_base 此接口对应查找基地址
 */
let timestr = func.time(),
    now = timestr,
    timestamp = func.GenerateTimeStamp (now),
    format = "JSON",
    accessKeyId = 'xxxxxxx',
    accessKeySecret = 'xxxxxxx',
    action = "SubmitMediaInfoJob",
    signatureMethod = "Hmac-SHA1",
    pipelineId = "xxxxxxx",
    nonce = func.GenerateNonce(),
    version = "2014-06-18",
    signatureVersion = "1.0",
    guid = "F08D0930-EA75-26C0-42F0-801B98027561-MP4_848",
    input = {
        "Bucket": "nrj-media",
        "Location" : "oss-cn-hangzhou",
        "Object" : guid
    },
    url_base = "http://mts.cn-hangzhou.aliyuncs.com";

input = urlencode(JSON.stringify(input), "utf-8");
Ali_Node_SDK.prototype.getRet(timestamp, format, accessKeyId, action, signatureMethod, nonce, version, signatureVersion, guid, input, accessKeySecret, url_base).then(info => {
    console.log(info);
});