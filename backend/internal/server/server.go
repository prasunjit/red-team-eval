package server

import (
	"fmt"
	"net"

	"google.golang.org/grpc"
)

func CreateListener(port int) (net.Listener, error) {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		return nil, fmt.Errorf("failed to listen on port %d: %w", port, err)
	}
	return lis, nil
}

func CreateGRPCServer() *grpc.Server {
	return grpc.NewServer()
}
