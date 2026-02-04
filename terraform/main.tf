provider "github" {
  token = var.github_token
  owner = var.github_owner
}

# GitHub repository
resource "github_repository" "site" {
  name        = var.repository_name
  description = var.repository_description
  visibility  = "public"

  has_issues   = true
  has_projects = false
  has_wiki     = false

  pages {
    build_type = "workflow"
    cname      = var.custom_domain != "" ? var.custom_domain : null
  }

  # Merge settings
  allow_merge_commit = true
  allow_squash_merge = true
  allow_rebase_merge = false

  delete_branch_on_merge = true
}

# Branch protection for main
resource "github_branch_protection" "main" {
  repository_id = github_repository.site.node_id
  pattern       = "main"

  required_status_checks {
    strict   = true
    contexts = ["Lint", "Type Check", "Test", "Build"]
  }

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    required_approving_review_count = 1
  }

  enforce_admins = false
}

# Repository secrets for GitHub Actions
resource "github_actions_secret" "bls_api_key" {
  count           = var.bls_api_key != "" ? 1 : 0
  repository      = github_repository.site.name
  secret_name     = "BLS_API_KEY"
  plaintext_value = var.bls_api_key
}

# Repository variables
resource "github_actions_variable" "site_url" {
  repository    = github_repository.site.name
  variable_name = "SITE_URL"
  value         = var.custom_domain != "" ? "https://${var.custom_domain}" : "https://${var.github_owner}.github.io/${var.repository_name}"
}

# Environment for production deployments
resource "github_repository_environment" "production" {
  repository  = github_repository.site.name
  environment = "github-pages"

  deployment_branch_policy {
    protected_branches     = true
    custom_branch_policies = false
  }
}
