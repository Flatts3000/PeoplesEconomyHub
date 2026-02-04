variable "github_token" {
  description = "GitHub personal access token with repo permissions"
  type        = string
  sensitive   = true
}

variable "github_owner" {
  description = "GitHub organization or username"
  type        = string
}

variable "repository_name" {
  description = "Name of the GitHub repository"
  type        = string
  default     = "peoples-economy-hub"
}

variable "repository_description" {
  description = "Repository description"
  type        = string
  default     = "A not-for-profit platform helping Americans understand household economic metrics"
}

variable "custom_domain" {
  description = "Custom domain for GitHub Pages (optional)"
  type        = string
  default     = ""
}

variable "bls_api_key" {
  description = "BLS API key for data fetching (optional, can be set manually)"
  type        = string
  sensitive   = true
  default     = ""
}
