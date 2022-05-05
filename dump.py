from re import A
import frida

device = frida.get_usb_device()
session = device.attach("Elvenar")

def my_message_handler(message, payload):
    if message["payload"] == "metdata":
        print("DUMPING METADATA")
        f = open("global-metadata.dat", "ab")
        f.write(payload)
        f.close()
        print("DONE")
    if message["payload"] == "il2cpp":
        print("DUMPING libil2cpp")
        a = open("libil2cpp.so", "ab")
        a.write(payload)
        a.close()
        print("DONE")

script = session.create_script("""
setTimeout(function(){
    var lib = Process.getModuleByName("libil2cpp.so")  //0x7cf98e3000
    var libaddress = lib.base
    console.log("libil2cpp.so: " + libaddress)
    Memory.protect(libaddress, lib.size, "rwx");
    send("il2cpp", libaddress.readByteArray(lib.size))
    Process.enumerateRangesSync({protection: 'r--', coalesce: true}).forEach(element => {
        Memory.scan(element.base, element.size, "AF 1B B1 FA", {
            onMatch(address, size){
                console.log("Metadata: " + address.toString())
                send("metdata", address.readByteArray(element.size))
            }
        })
    });
    //var address = ptr(0x7cd7935000)
    //send("il2cpp", address.readByteArray(12988416))
    }
, 0)
""")
script.on("message", my_message_handler)
script.load()

input()
