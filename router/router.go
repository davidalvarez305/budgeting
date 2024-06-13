package router

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/davidalvarez305/yd_vending/handlers"
)

func Router() *http.ServeMux {
	router := http.NewServeMux()

	currentDir, err := os.Getwd()

	if err != nil {
		log.Fatalf("ERROR GETTING CURRENT DIRECTORY: %+v\n", err)
	}

	router.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir(filepath.Join(currentDir, "static")))))

	router.HandleFunc("/partials/", handlers.PartialsHandler)
	router.HandleFunc("/", handlers.WebsiteHandler)

	return router
}
