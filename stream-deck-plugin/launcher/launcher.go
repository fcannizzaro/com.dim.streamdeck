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
	resp, _ := http.Get("https://github.com/fcannizzaro/com.dim.streamdeck/releases/download/latest/update.zip")
	return strings.Split(resp.Request.URL.Path, "tag/")[1]
}

// download a file from an url
func downloadFile(filename string, url string) {
	out, _ := os.Create(filename)
	resp, _ := http.Get(url)
	_, _ = io.Copy(out, resp.Body)
}

// start NodeJS
func startPlugin(binary string) {
	var args []string
	cwd, _ := os.Getwd()
	args = append(args, "app")
	args = append(args, os.Args[1:]...)
	cmd := exec.Command(binary, args...)
	cmd.Dir = cwd
	_ = cmd.Run()
}

// check if Node.js is already downloaded
func hasNode(name string) bool {
	_, err := os.Stat(name)
	return errors.Is(err, os.ErrNotExist)
}

// download a new update or initial plugin
func updatePlugin() {
	cwd, _ := os.Getwd()
	manifest := checkLocalManifest()
	onlineVersion := checkGitHubVersion()
	offlineVersion := manifest["Version"].(string)
	vOnline, _ := version.NewVersion(onlineVersion)
	vOffline, _ := version.NewVersion(offlineVersion)
	_, appDirErr := os.Stat("./app")
	if errors.Is(appDirErr, os.ErrNotExist) || vOffline.LessThan(vOnline) {
		downloadFile("release.zip", "https://github.com/fcannizzaro/com.dim.streamdeck/releases/latest/release.zip")
		uz := unzip.New("./release.zip", cwd)
		_ = uz.Extract()
		_ = os.Remove("./release.zip")
		// dialog.Alert("A Stream Deck Application restart is required!")
	}
}
