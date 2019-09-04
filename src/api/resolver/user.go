package resolver

import (
	"context"

	"github.com/HichuYamichu/fetcher-api/fetcher"
)

// UserResolver : resolves user
type UserResolver struct {
	rpc  fetcher.GuildFetcherClient
	user *fetcher.User
}

// Avatar : resolves user Avatar
func (u *UserResolver) Avatar(ctx context.Context) *string {
	return &u.user.Avatar
}

// ID : resolves user ID
func (u *UserResolver) ID(ctx context.Context) *string {
	return &u.user.Id
}

// Tag : resolves user Tag
func (u *UserResolver) Tag(ctx context.Context) *string {
	return &u.user.Tag
}