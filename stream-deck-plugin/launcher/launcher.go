package main

import (
	"encoding/json"
	"errors"
	"github.com/artdarek/go-unzip"
	"github.com/hashicorp/go-version"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"runtime"
	"strings"
)

// read stream deck plugin manifest.json
func checkLocalManifest() map[string]interface{} {
	var result map[string]interface{}
	jsonFile, _ := os.Open("./manifest.json")
	byteValue, _ := ioutil.ReadAll(jsonFile)
	_ = json.Unmarshal(byteValue, &result)
	return result
}

// check latest release tag
func checkGitHubVersion() string {
	resp, _ := http.Get("https://github.com/fcannizzaro/com.dim.streamdeck/releases/latest")
	return strings.Split(resp.Request.URL.Path, "tag/")[1]
}

// download a file from an url
func downloadFile(filename string, url string) {
	out, _ := os.Create(filename)
	resp, _ := http.Get(url)
	_, _ = io.Copy(out, resp.Body)
}

// os detection

func isWin() bool {
	return runtime.GOOS == "windows"
}

func isMac() bool {
	return runtime.GOOS == "darwin"
}

func isARM() bool {
	return isMac() && runtime.GOARCH == "arm64"
}

// filenames

func getBinaryFile() string {
	if isWin() {
		return "node.exe"
	} else {
		return "node"
	}
}

func getNodeDownloadFile() string {
	if isWin() {
		return "node.exe"
	} else if isARM() {
		return "node-v16.14.0-darwin-arm64"
	} else {
		return "node-v16.14.0-darwin-x64"
	}
}

// main

func main() {
	cwd, _ := os.Getwd()
	var args []string
	manifest := checkLocalManifest()
	onlineVersion := checkGitHubVersion()
	offlineVersion := manifest["Version"].(string)
	vOnline, _ := version.NewVersion(onlineVersion)
	vOffline, _ := version.NewVersion(offlineVersion)

	binary := getBinaryFile()
	downloadFilename := getNodeDownloadFile()

	// download node if needed
	if _, err := os.Stat(binary); errors.Is(err, os.ErrNotExist) {
		if isWin() {
			downloadFile(downloadFilename, "https://nodejs.org/dist/v16.14.0/win-x64/node.exe")
		} else {
			downloadFile(downloadFilename+".tar.gz", "https://nodejs.org/dist/v16.14.0/"+downloadFilename+".tar.gz")
			macUnzip(downloadFilename, cwd)
			_ = os.Remove("./" + downloadFilename + ".tar.gz")
			_ = os.Rename("./node-binaries/"+downloadFilename+"/bin/node", cwd+"/node")
			_ = os.Remove("./node-binaries")
		}
	}

	// download a new update or initial plugin
	_, appDirErr := os.Stat("./app")

	if errors.Is(appDirErr, os.ErrNotExist) || vOffline.LessThan(vOnline) {
		downloadFile("plugin.zip", "***REMOVED***/plugin.zip")
		uz := unzip.New("./plugin.zip", cwd)
		_ = uz.Extract()
		_ = os.Remove("./plugin.zip")
		// dialog.Alert("A Stream Deck Application restart is required!")
	}

	// run the plugin
	args = append(args, "app")
	args = append(args, os.Args[1:]...)
	cmd := exec.Command(binary, args...)
	cmd.Dir = cwd
	_ = cmd.Run()
}
