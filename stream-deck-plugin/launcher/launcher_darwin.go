package main

import (
	"github.com/ncruces/zenity"
	"os"
)

func main() {
	var cacheDir = binaryPath()
	var nodeBinary = cacheDir + "node-16"
	var dlg zenity.ProgressDialog
	if missingNode(nodeBinary) {
		dlg := showProgress()
		_ = dlg.Text("Downloading Node.JS engine..")
		var zipFile = "node-v16.14.0-darwin-arm64"
		downloadFile(zipFile, "https://nodejs.org/dist/v16.14.0/"+zipFile+".tar.gz")
		macUnzip(cacheDir+zipFile+".tar.gz", cacheDir)
		_ = os.Remove(cacheDir + zipFile + ".tar.gz")
		_ = os.Rename(cacheDir+"/node-binaries/"+zipFile+"/bin/node", nodeBinary)
		_ = os.Remove(cacheDir + "/node-binaries")
	}
	updatePlugin(dlg)
	startPlugin(nodeBinary)
}
