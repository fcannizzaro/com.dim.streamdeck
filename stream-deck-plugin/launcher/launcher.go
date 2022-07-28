package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/artdarek/go-unzip"
	"github.com/hashicorp/go-version"
	"github.com/ncruces/zenity"
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
	resp, _ := http.Get("https://github.com/fcannizzaro/com.dim.streamdeck/releases/latest")
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
	fmt.Println(binary)
	fmt.Println(args)
	_ = cmd.Run()
}

// check if Node.js is already downloaded
func missingNode(name string) bool {
	_, err := os.Stat(name)
	return errors.Is(err, os.ErrNotExist)
}

// download a new update or initial plugin
func updatePlugin(dlg zenity.ProgressDialog) {
	cwd, _ := os.Getwd()
	manifest := checkLocalManifest()
	onlineVersion := checkGitHubVersion()
	offlineVersion := manifest["Version"].(string)
	vOnline, _ := version.NewVersion(onlineVersion)
	vOffline, _ := version.NewVersion(offlineVersion)
	_, appDirErr := os.Stat("./app")
	if errors.Is(appDirErr, os.ErrNotExist) || vOffline.LessThan(vOnline) {
		if dlg == nil {
			dlg = showProgress()
		}
		_ = dlg.Text("Downloading plugin update...")
		downloadFile("update.zip", "https://github.com/fcannizzaro/com.dim.streamdeck/releases/latest/download/update.zip")
		uz := unzip.New("./update.zip", cwd)
		_ = uz.Extract()
		_ = os.Remove("./update.zip")
	}
	if dlg != nil {
		_ = dlg.Complete()
	}
}

func showProgress() zenity.ProgressDialog {
	dlg, _ := zenity.Progress(
		zenity.Title("DIM Stream Deck"),
		zenity.Pulsate(),
	)
	return dlg
}
