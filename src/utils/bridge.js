/**
 * Created by Administrator on 2018/12/5.
 */

// Browser kernel
const browser = {
  versions: function () {
    var u = navigator.userAgent;
    return {
      trident: u.indexOf('Trident') > -1, //IE
      presto: u.indexOf('Presto') > -1, //opera
      webKit: u.indexOf('AppleWebKit') > -1, //AppleWebKit
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//Gecko
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //Mobile
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //Android or UC
      iPhone: u.indexOf('iPhone') > -1, //iPhone
      iPad: u.indexOf('iPad') > -1, //iPad
      webApp: u.indexOf('Safari') == -1, //Safari
      weixin: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger', //wechat
      qq: u.match(/\sQQ/i) == " qq" //qq
    };
  }()
};

// Non-string to string
export const toStringify = (body) => {
  if (typeof body !== 'string') {
    return JSON.stringify(body)
  } else {
    return body
  }
}

// Non-json to json
export const toJson = (body) => {
  if (typeof body !== 'string') {
    return body
  } else {
    return JSON.parse(body)
  }
}

// error
export const errorHandle = (error) => {
  if (error.isServerError) {
    return {code: 0,data:'',message: 'isServerError:'+error.message}

  } else {
    return {code: 0,data:'',message: 'isClientError:'+error.message}
  }
}

// Call the iOS or Android  method name handle wrapper
export const bridge = (handle, body) => {
  if (body.code === 0) {} else {
    body = {
      code: 1,
      data: body,
      message:''
    }
  }
  body = JSON.stringify(body)
  console.log(handle, body);
  if (browser.versions.ios) {
    if (window.webkit.messageHandlers[handle]) {
      window.webkit.messageHandlers[handle].postMessage(body);
    } else {
      throw new Error('未检测到回调方法')
    }
  }
  if (browser.versions.android) {
    if (window.test[handle]) {
      window.test[handle](body)
    } else {
      throw new Error('未检测到回调方法')
    }
  }
}


