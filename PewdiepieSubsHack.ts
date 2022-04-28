var baseModule = Process.getModuleByName("libil2cpp.so").base

var DataUserManagerTypeInfo = baseModule.add(0x02cdb2d8)
var staticFields = DataUserManagerTypeInfo.add(184).readPointer()
var DataUserManager = staticFields.add(0)

var GetLocalPP = new NativeFunction(baseModule.add(0x0143cac8), 'pointer', [])
var AddSubs = new NativeFunction(baseModule.add(0x013bcabc), 'void', ['pointer', 'double'])

