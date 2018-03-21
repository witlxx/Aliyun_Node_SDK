const moment = require('moment'),
    nodeuuid = require("node-uuid"),
    urlencode = require("urlencode"),
    crypto = require("crypto"),
    co = require("co"),
    request = require("request");

let func = require("./aliyun_function.js");
/**
 * 封装类库
 */
class Ali_Node_SDK {
    
        constructor() {
        }

        getRet(timestamp, format, accessKeyId, action, signatureMethod, nonce, version, signatureVersion, guid, input, accessKeySecret, url_base) {
            return new Promise ((resolve, reject) => {
                let args = func.GenerateArgs(timestamp, format, accessKeyId, action, signatureMethod, nonce, version, signatureVersion, guid, input),
                    signs = func.GenerateSignature(accessKeySecret, args),
                    timestamp_encode = timestamp.replace(":", "%3A").replace(":", "%3A"),
                    final_url = url_base + "?Input=" + input + "&TimeStamp=" + timestamp_encode + "&Format=" + format + "&AccessKeyId=" + accessKeyId + "&Action=" + action + "&SignatureMethod=" + signatureMethod + "&SignatureNonce=" + nonce + "&Version=" + version + "&SignatureVersion=" + signatureVersion + "&Signature=" + signs;
                var options = {
                    headers: {"Connection": "close"},
                    url: final_url,
                    method: "GET",
                    json:true,
                    body: ""
                };
    
                request(options, function(error, response, data) {
                    if(error){
                        resolve(error);
                    }else{
                        resolve(data);
                    }
                });
            });
        }
    }
    
    module.exports = Ali_Node_SDK;
