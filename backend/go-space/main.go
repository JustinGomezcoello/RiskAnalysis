package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

type RiskRequest struct {
	AssetID string `json:"asset_id"`
	Impact  int    `json:"impact"`
	Probability int `json:"probability"`
}

type RiskResponse struct {
	AssetID string `json:"asset_id"`
	Risk    int    `json:"risk"`
}

func main() {
	r := gin.Default()

	r.POST("/api/risk/calculate/", func(c *gin.Context) {
		var req RiskRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		risk := req.Impact * req.Probability
		c.JSON(http.StatusOK, RiskResponse{
			AssetID: req.AssetID,
			Risk:   risk,
		})
	})

	r.GET("/api/risk/overview/", func(c *gin.Context) {
		// Simulación de matriz de riesgos
		c.JSON(http.StatusOK, gin.H{"overview": "risk matrix example"})
	})

	r.GET("/api/risk/residual/", func(c *gin.Context) {
		// Simulación de riesgo residual
		c.JSON(http.StatusOK, gin.H{"residual_risk": 42})
	})

	r.Run(":8080")
} 