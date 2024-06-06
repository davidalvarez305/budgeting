package models

import "time"

type VendingType struct {
	VendingTypeID int    `json:"vending_type_id"`
	MachineType   string `json:"machine_type"`
}

type VendingLocation struct {
	VendingLocationID int    `json:"vending_location_id"`
	LocationType      string `json:"location_type"`
}

type City struct {
	CityID int    `json:"city_id"`
	Name   string `json:"name"`
}

type Lead struct {
	LeadID            int    `json:"lead_id"`
	FirstName         string `json:"first_name"`
	LastName          string `json:"last_name"`
	PhoneNumber       string `json:"phone_number"`
	CreatedAt         int64  `json:"created_at"`
	Rent              string `json:"rent"`
	FootTraffic       int    `json:"foot_traffic"`
	FootTrafficType   string `json:"foot_traffic_type"`
	VendingTypeID     int    `json:"vending_type_id"`
	VendingLocationID int    `json:"vending_location_id"`
	CityID            int    `json:"city_id"`
	UserKey           string `json:"user_key"`
}

type LeadMarketing struct {
	LeadMarketingID int    `json:"lead_marketing_id"`
	LeadID          int    `json:"lead_id"`
	Source          string `json:"source"`
	Medium          string `json:"medium"`
	Channel         string `json:"channel"`
	LandingPage     string `json:"landing_page"`
	Keyword         string `json:"keyword"`
	Referrer        string `json:"referrer"`
	Gclid           string `json:"gclid"`
	CampaignID      int    `json:"campaign_id"`
	AdCampaign      string `json:"ad_campaign"`
	AdGroupID       int    `json:"ad_group_id"`
	AdGroupName     string `json:"ad_group_name"`
	AdSetID         int    `json:"ad_set_id"`
	AdSetName       string `json:"ad_set_name"`
	AdID            int    `json:"ad_id"`
	AdHeadline      int    `json:"ad_headline"`
	Language        string `json:"language"`
	OS              string `json:"os"`
	UserAgent       string `json:"user_agent"`
	ButtonClicked   string `json:"button_clicked"`
	DeviceType      string `json:"device_type"`
	IP              string `json:"ip"`
}

type CSRFToken struct {
	CSRFTokenID int    `json:"csrf_token_id"`
	ExpiryTime  int64  `json:"expiry_time"`
	Token       string `json:"token"`
	IsUsed      bool   `json:"is_used"`
}

type TextMessage struct {
	TextMessageID int       `json:"text_message_id"`
	MessageSID    string    `json:"message_sid"`
	UserID        int       `json:"user_id"`
	FromNumber    string    `json:"from_number"`
	ToNumber      string    `json:"to_number"`
	Body          string    `json:"body"`
	Status        string    `json:"status"`
	CreatedAt     time.Time `json:"created_at"`
	IsInbound     bool      `json:"is_inbound"`
}
