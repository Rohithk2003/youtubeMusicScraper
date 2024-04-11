import os
s = os.listdir()
with open("music.txt","w") as file:
    for i in s:
        if not i.endswith("py") or not i.endswith("txt"):
            file.write(i)
            file.write("\n")
    file.close()
    
