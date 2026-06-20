package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"arena/backend/internal/config"
	"arena/backend/internal/server"

	"go.uber.org/zap"
)

func main() {
	logger, err := zap.NewProduction()
	if err != nil {
		panic(fmt.Sprintf("Failed to initialize logger: %v", err))
	}

	defer logger.Sync()

	cfg, err := config.LoadConfig()
	if err != nil {
		logger.Fatal("Failed to load configuration", zap.Error(err))
	}

	lis, err := server.CreateListener(cfg.Port)
	if err != nil {
		logger.Fatal("Failed to create listener", zap.Error(err))
	}

	grpcServer := server.CreateGRPCServer()

	go func() {
		logger.Info("Starting gRPC server", zap.Int("port", cfg.Port))
		if err := grpcServer.Serve(lis); err != nil {
			logger.Fatal("Failed to start gRPC server", zap.Error(err))
		}
	}()

	WaitForShutdown()

	logger.Info("Shutting down gRPC server")
	grpcServer.GracefulStop()

}

func WaitForShutdown() {
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)
	<-sigCh
}
