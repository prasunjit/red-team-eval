package config

import (
	"fmt"
	"os"
	"strconv"
)

type Config struct {
	Port int
}

func LoadConfig() (*Config, error) {
	portStr := os.Getenv("PORT")
	if portStr == "" {
		portStr = "50051" // default port
	}

	port, err := strconv.Atoi(portStr)
	if err != nil {
		return nil, fmt.Errorf("invalid PORT value: %w", err)
	}

	return &Config{Port: port}, nil
}
