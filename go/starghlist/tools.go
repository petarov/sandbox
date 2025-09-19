package main

import (
	"bytes"
	"context"
	"encoding/csv"
	"fmt"
	"strconv"

	"github.com/modelcontextprotocol/go-sdk/mcp"
)

type GetStarsParams struct {
	Username string `json:"username,omitempty" jsonschema:"Username for which to get the starred repositories or empty string to use the authenticated user;optional"`
	Page     int    `json:"page,omitempty" jsonschema:"Page number from where to get results;optional"`
}

func newToolError(message string) *mcp.CallToolResult {
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: fmt.Sprintf("error: %s", message)},
		},
	}
}

func GetStars(ctx context.Context, req *mcp.CallToolRequest, params *GetStarsParams) (*mcp.CallToolResult, any, error) {
	repos, err := fetchStarredRepos(ctx, params.Username, params.Page)
	if err != nil {
		return newToolError("fetching starred repositories"), nil, nil
	}

	// json, err := json.Marshal(repos)
	// if err != nil {
	// 	return newToolError("json marshal repositories"), nil, nil
	// }

	var buf bytes.Buffer
	writer := csv.NewWriter(&buf)

	writer.Write([]string{
		"StarredAt", "ID", "OwnerName", "Name", "FullName",
		"Description", "DefaultBranch", "MasterBranch",
		"CreatedAt", "PushedAt", "UpdatedAt", "Language", "Fork",
		"ForksCount", "StargazersCount", "WatchersCount", "LicenseName",
		"URL",
	})

	for _, r := range repos {
		record := []string{
			r.StarredAt.String(),
			strconv.FormatInt(r.ID, 10),
			// r.NodeID,
			r.OwnerName,
			r.Name,
			r.FullName,
			r.Description,
			// r.Homepage,
			r.DefaultBranch,
			r.MasterBranch,
			r.CreatedAt.String(),
			r.PushedAt.String(),
			r.UpdatedAt.String(),
			r.Language,
			strconv.FormatBool(r.Fork),
			strconv.Itoa(r.ForksCount),
			strconv.Itoa(r.StargazersCount),
			strconv.Itoa(r.WatchersCount),
			r.LicenseName,
			r.URL,
		}
		writer.Write(record)
	}

	writer.Flush()
	if err := writer.Error(); err != nil {
		return newToolError("writing csv results"), nil, nil
	}

	return &mcp.CallToolResult{
		Content: []mcp.Content{
			// &mcp.TextContent{Text: string(json)},
			&mcp.TextContent{Text: buf.String()},
		},
	}, nil, nil
}
