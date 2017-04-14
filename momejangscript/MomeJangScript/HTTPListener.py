import http.server
import re


class MyHandler(http.server.SimpleHTTPRequestHandler):

    def do_POST(self):
        content_type = self.headers['content-type']
        boundary = content_type.split("=")[1].encode()
        remainbytes = int(self.headers['content-length'])

        line = self.rfile.readline()
        remainbytes -= len(line)
        if not boundary in line:
            self.send_response(406, "Content NOT begin with boundary")
            return

        line = self.rfile.readline()
        remainbytes -= len(line)
        fn = re.findall(r'Content-Disposition.*name="file"; filename="(.*)"', line.decode())

        if not fn:
            self.send_response(406, "Can't find out file name...")
            return

        #this is because requests always sends 2 extra line of info (content type and then a line break)
        #before the content begins
        for i in range(0,2):
            line = self.rfile.readline()
            remainbytes -= len(line)

        file = open(fn[0], "wb")

        preline = self.rfile.readline()
        remainbytes -= len(preline)

        while remainbytes > 0:
            line = self.rfile.readline()
            remainbytes -= len(line)
            if boundary in line:
                file.write(preline[0:-1])
                file.close()
            else:
                file.write(preline)
                preline = line

        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.send_header("Content-Length", self.headers['content-length'])
        self.end_headers()

        return




PORT = 8000


with http.server.HTTPServer(("", PORT), MyHandler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
