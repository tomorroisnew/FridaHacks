var BaseModule = Process.getModuleByName("ConsoleApplication8.exe").base

var testAddress = BaseModule.add(0x00011850)

var tt = new NativeFunction(testAddress, 'void', ['int', 'int'])

function callback(a,b){
  Interceptor.detachAll()
  tt(a, b)
  tt(a,b)
  tt(a,b)
  Interceptor.replace(testAddress, native)
}

var native = new NativeCallback(callback, 'void', ['int', 'int'])

Interceptor.replace(testAddress, native)
