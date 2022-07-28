package main

import (
	"os"
	"runtime"
)

func IsARM() bool {
	return runtime.GOARCH == "arm64"
}

func getNodeDownloadFile() string {
	if IsARM() {
		return "node-v16.14.0-darwin-arm64"
	} else {
		return "node-v16.14.0-darwin-x64"
	}
}

func main() {
	cwd, _ := os.Getwd()
	zipFile := getNodeDownloadFile()
	if !hasNode("node") {
		downloadFile(zipFile+".tar.gz", "https://nodejs.org/dist/v16.14.0/"+zipFile+".tar.gz")
		macUnzip(zipFile, cwd)
		_ = os.Remove("./" + zipFile + ".tar.gz")
		_ = os.Rename("./node-binaries/"+zipFile+"/bin/node", cwd+"/node")
		_ = os.Remove("./node-binaries")
	}
	updatePlugin()
	startPlugin("node")
}
