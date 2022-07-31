package main

import (
	"github.com/ncruces/zenity"
)

func main() {
	var nodeBinary = binaryPath() + "node-16.exe"
	var dlg zenity.ProgressDialog
	if missingNode(nodeBinary) {
		dlg = showProgress()
		_ = dlg.Text("Downloading Node.JS engine..")
		// download compressed node
		downloadFile(nodeBinary, "https://nodejs.org/dist/v16.14.0/win-x64/node.exe")
	}
	updatePlugin(dlg)
	startPlugin(nodeBinary)
}
