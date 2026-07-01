package grpcclient

import (
	"arena/backend/pb"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type Client struct {
	conn        *grpc.ClientConn
	ArenaClient pb.ArenaServiceClient
}

func NewClient(address string) (*Client, error) {
	conn, err := grpc.NewClient(address, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return nil, err
	}

	client := pb.NewArenaServiceClient(conn)

	return &Client{
		conn:        conn,
		ArenaClient: client,
	}, nil
}

func (c *Client) Close() error {
	return c.conn.Close()
}
