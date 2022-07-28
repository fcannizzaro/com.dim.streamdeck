package main

func main() {
	if !hasNode("node.exe") {
		downloadFile("node.exe", "https://nodejs.org/dist/v16.14.0/win-x64/node.exe")
	}
	updatePlugin()
	startPlugin("node.exe")
}
