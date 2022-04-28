var baseModule = Process.getModuleByName("libil2cpp.so")

//Domain Stuff
var il2cpp_domain_get = new NativeFunction(baseModule.findExportByName("il2cpp_domain_get"), 'pointer', [])
var il2cpp_thread_attach = new NativeFunction(baseModule.findExportByName("il2cpp_thread_attach"), 'pointer', ['pointer'])//domain
var il2cpp_domain_assembly_open = new NativeFunction(baseModule.findExportByName("il2cpp_domain_assembly_open"), 'pointer', ['pointer', 'pointer'])//domain, assemblyname
var il2cpp_assembly_get_image = new NativeFunction(baseModule.findExportByName("il2cpp_assembly_get_image"), 'pointer', ['pointer'])//assembly

//Class stuff
var il2cpp_class_from_name = new NativeFunction(baseModule.findExportByName("il2cpp_class_from_name"), 'pointer', ['pointer', 'pointer', 'pointer'])//image, namespace, classname

//Type stuff
var il2cpp_type_get_name = new NativeFunction(baseModule.findExportByName("il2cpp_type_get_name"), 'pointer', ['pointer'])//type

//Field Stuff
var il2cpp_field_static_get_value = new NativeFunction(baseModule.findExportByName("il2cpp_field_static_get_value"), 'pointer', ['pointer', 'pointer'])//field, result
var il2cpp_class_get_field_from_name = new NativeFunction(baseModule.findExportByName("il2cpp_class_get_field_from_name"), 'pointer', ['pointer', 'pointer'])//class, fieldname

//Method Stuff
var il2cpp_class_get_method_from_name = new NativeFunction(baseModule.findExportByName("il2cpp_class_get_method_from_name"), 'pointer', ['pointer', 'pointer', 'int'])//class, methodname, param_Count

//Main Script

il2cpp_thread_attach(il2cpp_domain_get())
var image = il2cpp_assembly_get_image(il2cpp_domain_assembly_open(il2cpp_domain_get(), Memory.allocUtf8String("Assembly-CSharp.dll")))
var PublishVideoClass = il2cpp_class_from_name(image, Memory.allocUtf8String(""), Memory.allocUtf8String("PublishVideo"))

var getLocalPP = il2cpp_class_get_method_from_name(PublishVideoClass, Memory.allocUtf8String("get_LocalPP"), 0).readPointer()

var GetLocalPP = new NativeFunction(getLocalPP, 'pointer', [])

var DataUserPrivateDataclass = il2cpp_class_from_name(image, Memory.allocUtf8String("Data"), Memory.allocUtf8String("DataUserPrivateData"))
var addSubs = il2cpp_class_get_method_from_name(DataUserPrivateDataclass, Memory.allocUtf8String("AddSubs"), 1).readPointer()
var AddSubs = new NativeFunction(addSubs, 'void', ['pointer', 'double'])

