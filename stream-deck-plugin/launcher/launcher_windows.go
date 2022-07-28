package main

import "github.com/ncruces/zenity"

func main() {
	var dlg zenity.ProgressDialog
	if missingNode("./node.exe") {
		dlg = showProgress()
		_ = dlg.Text("Downloading Node.JS engine..")
		downloadFile("node.exe", "https://nodejs.org/dist/v16.14.0/win-x64/node.exe")
	}
	updatePlugin(dlg)
	startPlugin("./node.exe")
}
