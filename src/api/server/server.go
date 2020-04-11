package server

import (
	"context"
	"fmt"

	"github.com/hichuyamichu/junko/junko"
	"google.golang.org/grpc"

	"github.com/hichuyamichu/junko/commands"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
)

// Server application struct
type Server struct {
	router *echo.Echo

	commandHandler *commands.Handler
}

// New creates new Server
func New(conn *grpc.ClientConn) *Server {
	junkoClient := junko.NewJunkoClient(conn)
	commandService := commands.NewService(junkoClient)
	commandHandler := commands.NewHandler(commandService)

	server := &Server{
		router:         echo.New(),
		commandHandler: commandHandler,
	}

	server.configure()
	server.setRoutes()
	return server
}

func (s *Server) configure() {
	s.router.HideBanner = true
	s.router.HTTPErrorHandler = httpErrorHandler
	s.router.Logger.SetLevel(log.INFO)

	s.router.Use(middleware.Logger())
	s.router.Use(middleware.Recover())
}

func (s *Server) setRoutes() {
	api := s.router.Group("/api")
	api.GET("/commands", s.commandHandler.Commands)
}

// Shutdown shuts down the server
func (s *Server) Shutdown(ctx context.Context) {
	s.router.Shutdown(ctx)
}

// Start starts the server
func (s *Server) Start(host string, port string) error {
	return s.router.Start(fmt.Sprintf("%s:%s", host, port))
}